import { Request, Response } from 'express';
import CDN from '../../Schemes/cdn';
import { cdnInterface } from '../../Types/interfaces';
import moment from 'moment';
import Auth from '../Handlers/auth';

export default async (req: Request, res: Response): Promise<Response> => {
    if (!await Auth(req)) return res.json({ error: 'Invalid Access.'})

    let response: Object[] = []
    let data: cdnInterface[] = await CDN.find({})
    if (data && data[0]) {
        await data.forEach(async e => {
            response.push({
                ID: e.ID,
                URL: `${process.env.CDN}/files/${e.ID}`,
                Time: e.Time,
                TimeFormatted: moment.unix(Number(e.Time) / 1000).format('ddd DD MMM YYYY, hh:mm:ss A'),
                Cached: e.Cached ? true : false,
                RequestedTimes: e.RequestedTimes
            })
        })
        return res.json(response)
    } else return res.json({ error: 'No Data in Database.'})
}