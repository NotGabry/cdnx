import { Request, Response } from 'express';
import { unlink, readdirSync } from 'node:fs';
import CDN from '../../Schemes/cdn'
import { cdnInterface } from '../../Types/interfaces';
import Auth from '../Handlers/auth';

let opts: String[] = ['Only', 'All', 'Local']

export default async (req: Request, res: Response): Promise<Response> => {
    if (!await Auth(req)) return res.json({ error: 'Invalid Access.'})
    if (!req.body.Option || req.body.Option && !opts.includes(req.body.Option)) return res.json({ error: 'Invalid Option.' })
    if (req.body.Option == opts[0] && !req.body.ID) return res.json({ error: 'Invalid ID.' })

    if (req.body.Option == opts[0]) {
        let data = await CDN.findOne({ ID: req.body.ID })
        if (data) {
            await CDN.deleteOne({ ID: req.body.ID })
            await unlink(`./Data/${req.body.ID}`, async () => {})
        
            return res.json({ sucess: `The file [${req.body.ID}] was deleted from cache and database.` })
        } else return res.json({ error: 'No Data Found.' })
    } else if (req.body.Option == opts[1]) {
        let data: cdnInterface[] = await CDN.find({})
        if (data && data[0]) {
            data.forEach(async e => {
                await CDN.deleteOne({ ID: e.ID })
                await unlink(`./Data/${e.ID}`, async () => {}) 
            })
            return res.json({ sucess: `All the files are now deleted, from cache and database.` })
        } else return res.json({ error: 'No Data Found.' })
    } else if (req.body.Option == opts[2]) {
        let files = await readdirSync('./Data')
        if (!files || !files[0]) return res.json({ error: 'No Data Found.' })
        for (let file of files) {
            let data: cdnInterface = await CDN.findOne({ ID: file })
            if (data) {
                data.Cached = false
                await data.save()
            }
            await unlink(`./Data/${file}`, async () => {})
        }
        return res.json({ sucess: `The entire local cache was deleted` })
    }
}