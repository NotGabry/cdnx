import { readdir, mkdirSync } from 'node:fs';

export default async (): Promise<void> => {
    await readdir('./Data', async (err: Error) => {
        if (err) await mkdirSync('./Data')
    })
}