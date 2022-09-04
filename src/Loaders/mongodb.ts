import mongoose from 'mongoose';
import chalk from 'chalk'

export default async (): Promise<void> => {
    mongoose.connect(process.env.MongoURI)
    
    mongoose.connection.on('connected', async () => {
        console.log(`${chalk.greenBright('[Debug]')} ${chalk.reset('Database')} ${chalk.yellow('Connected!')}`)
    })
}