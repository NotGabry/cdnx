import chalk from 'chalk'
import { Application } from 'express';

export default async (app: Application): Promise<void> => {
    app.listen(process.env.PORT || 9494, async () => {
        console.log(`${chalk.green('[Debug]')} ${chalk.reset('Express Module')} ${chalk.yellow('Loaded.')}`)
        console.log(`${chalk.green('[Debug]')} ${chalk.reset('Loaded Port ')}${chalk.yellow(`${process.env.PORT}`)}`)
    })
}