import { validateSendBulkSms, validateSendBulkEmail, validateSendSms, validateSendEmail } from '../validation';
import { Request, Response, NextFunction } from 'express';
import { BulkNotifications, Email, Sms } from '../models';

export const validateSmsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = validateSendSms(req.body as Sms);
    if (error) {
        res.status(400).send(error.details[0].message);
    } else { next(); }
};


export const validateBulkSmsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = validateSendBulkSms(req.body as BulkNotifications);
    if (error) {
        res.status(400).send(error.details[0].message);
    } else { next(); }
};


export const validateEmailMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = validateSendEmail(req.body as Email);
    if (error) {
        res.status(400).send(error.details[0].message);
    } else { next(); }
};


export const validateBulkEmailMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = validateSendBulkEmail(req.body as BulkNotifications);
    if (error) {
        res.status(400).send(error.details[0].message);
    } else { next(); }
};


