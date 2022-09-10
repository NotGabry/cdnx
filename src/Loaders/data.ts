import { readdirSync, unlink } from 'node:fs'

export default async (): Promise<void> => {
    let hour: number = new Date().getHours()
    let minute: number = new Date().getMinutes()

    if (hour == 0 && minute == 0) {
        let files = await readdirSync('./Data')
        for (let file of files) {
            await unlink(`./Data/${file}`,  async () => {})
        }
    }
}