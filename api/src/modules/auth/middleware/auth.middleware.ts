import { validateLogin } from '../validation';
import { Request, Response, NextFunction } from 'express';
import { Credentials } from '../models';

export const validateLoginMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = validateLogin(req.body as Credentials);
    if (error) {
        res.status(400).send(error.details[0].message);
    } else { next(); }
};