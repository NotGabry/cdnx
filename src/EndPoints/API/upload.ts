import { Request, Response } from 'express';
import CDN from '../../Schemes/cdn';
import { cdnInterface } from '../../Types/interfaces';
let opts: String[] = ['custom', 'crypted']

export default async (req: Request, res: Response) => {
    if (!req.body.Password || req.body.Password && req.body.Password != process.env.Password) return res.json({ error: 'Invalid Access.'})
    if (!req.body.Data) return res.json({ error: 'Data Not Found.' })
    if (!req.body.TypeID) return res.json({ error: `Invalid ID Type. Valid IDs are ${opts.join(', ')}` })
    if (!opts.includes(String(req.body.TypeID))) return res.json({ error: `Invalid ID Type. Valid IDs are ${opts.join(', ')}.` })
    if (req.body.TypeID == 'crypted' && !req.body.FileExtention) return res.json({ error: 'Invalid File Extention.' })
    else if (req.body.TypeID == 'custom' && !req.body.ID) return res.json({ error: 'Invalid ID.' })
    
    let name: string = String(req.body.TypeID) && String(req.body.TypeID) == 'custom' ? String(req.body.ID).split('.')[0] : Math.random().toString(36).slice(2, 15)

    await CDN.findOne({
        ID: req.body.ID.split('.')[0]
    }, async (err: Error, data: cdnInterface) => {
        if (data) {
            while (true) {
               if (data.ID.split('.')[0] == name) name = `${name}.${Math.random().toString(36).slice(2, 6)}` 

               if (data.ID.split('.')[0] != name) break
            }

            await res.json({ success: `Another file had the name [${req.body.ID}], the new file name is [${name}.${String(req.body.ID).split('.')[1] || req.body.FileExtention}]`, URL: `${process.env.CDN}/files/${name}.${String(req.body.ID).split('.')[1] || req.body.FileExtention}` })
        } else {
            await CDN.create({
                ID: name,
                Data: req.body.Data,
                Time: new Date().getTime()
            })

            await res.json({ success: 'The file was uploaded.', URL: `${process.env.CDN}/files/${name}.${String(req.body.ID).split('.')[1] || req.body.FileExtention}` })
        }
    })
}