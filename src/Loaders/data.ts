import { readdirSync, unlink } from 'node:fs';
import CDN from '../Schemes/cdn';
import { cdnInterface } from '../Types/interfaces';

export default async (): Promise<void> => {
    let hour: number = new Date().getHours()
    let minute: number = new Date().getMinutes()

    if (hour == 17 && minute == 0) {
        let files = await readdirSync('./Data')
        for (let file of files) {
            let db: cdnInterface = await CDN.findOne({ ID: file })
            if (db) {
                db.Cached = false
                await db.save()
            }
            await unlink(`./Data/${file}`,  async () => {})
        }
    }
}