import { Request, Response } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
    res.redirect('https://gabry.ga')
}