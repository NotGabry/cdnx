import { Request, Response } from 'express';
import CDN from '../../Schemes/cdn';
import { cdnInterface } from '../../Types/interfaces';
import moment from 'moment';

export default async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.Password || req.body.Password && req.body.Password != process.env.Password) return res.json({ error: 'Invalid Access.'})

    let response: Object[] = []
    await CDN.find({}, async (err: Error, data: cdnInterface[]) => {
        if (data && data[0]) {
            await data.forEach(async e => {
                response.push({
                    ID: e.ID,
                    URL: `${process.env.CDN}/files/${e.ID}`,
                    Time: e.Time,
                    TimeFormatted: moment.unix(Number(e.Time) / 1000).format('ddd DD MMM YYYY, hh:mm:ss A')
                })
            })
            return res.json(response)
        } else return res.json({ error: 'No Data in Database.'})
    })

}