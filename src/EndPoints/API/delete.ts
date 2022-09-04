import { Request, Response } from 'express';
import { unlinkSync } from 'node:fs';
import CDN from '../../Schemes/cdn'
import { cdnInterface } from '../../Types/interfaces';
import Auth from '../Handlers/auth';

export default async (req: Request, res: Response): Promise<Response> => {
    if (!await Auth(req)) return res.json({ error: 'Invalid Access.'})
    if (!req.query.all && !req.body.ID) return res.json({ error: 'Invalid ID.' })

    if (!req.query.all) {
        let data = await CDN.findOne({ ID: req.body.ID })
        if (data) {
            await CDN.findOneAndDelete({ ID: req.body.ID })
            try {
                await unlinkSync(`./Data/${req.body.ID}`)
            } catch {
    
            }
            return res.json({ sucess: `The file [${req.body.ID}] was deleted.` })
        } else return res.json({ error: 'No Data Found.' })
    } else {
        await CDN.find({}, async (err: Error, data: cdnInterface[]) => {
            if (data && data[0]) {
                data.forEach(async e => {
                    await CDN.findOneAndDelete({ ID: e.ID })
                    try {
                        await unlinkSync(`./Data/${e.ID}`)
                    } catch {
            
                    }  
                })
                return res.json({ sucess: `The entire database was deleted` })
            } else return res.json({ error: 'No Data Found.' })
        })
    }
}