import { NextFunction, Request, Response } from 'express';

const KEY = 'a11';

export const apiKeyValidator = (req:Request, res:Response, next:NextFunction):void | Response => {
    const apiKey = req.get('api-key');
    if (!apiKey || apiKey !== KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};