import { Request } from 'express';

export default async (req: Request): Promise<Boolean> => {
    if (!req.headers) return false
    if (!req.headers.authorization) return false
    if (req.headers.authorization.toString().split(' ')[1] == process.env.Password) return true
    else return false
}