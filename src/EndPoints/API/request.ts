import { Request, Response } from 'express';
import { writeFileSync, readFile } from 'node:fs';
import CDN from '../../Schemes/cdn';
import { cdnInterface } from '../../Types/interfaces';
import path from 'node:path';


export default async (req: Request, res: Response): Promise<Response> => {
    if (!req.params.ID) return res.json({ error: 'Path Not Found '})
    if (!String(req.params.ID).includes('.')) return res.json({ error: 'Invalid ID.'})

    let data: cdnInterface = await CDN.findOne({ ID: String(req.params.ID) })
    if (data) {
        await readFile(`./Data/${String(req.params.ID)}`, async (err: Error, data_: Buffer) => {
            if (err) {
                data.Cached = true
                await data.save()
                await writeFileSync(`./Data/${String(req.params.ID)}`, String(data.Data), { encoding: 'base64' })
                return res.sendFile(path.join(path.resolve('.'), 'Data', String(req.params.ID)))
            } else res.sendFile(path.join(path.resolve('.'), 'Data', String(req.params.ID)))
        })
    } else return res.json({ error: 'No Data Found.'})
}