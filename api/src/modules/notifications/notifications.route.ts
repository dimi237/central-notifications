import Container from 'typedi';
import { validateBulkEmailMiddleware, validateBulkSmsMiddleware, validateEmailMiddleware, validateSmsMiddleware } from './middleware';
import { NotificationsController } from './notifications.controller';
import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();
export const notificationsController = Container.get(NotificationsController);


router.get('/sms', validateSmsMiddleware, (req: Request, res: Response, next: NextFunction) => notificationsController.sendSms(req, res, next));

router.get('/bulk/sms', validateBulkSmsMiddleware, (req: Request, res: Response, next: NextFunction) => notificationsController.sendBulkSms(req, res, next));

router.get('/email', validateEmailMiddleware, (req: Request, res: Response, next: NextFunction) => notificationsController.sendEmail(req, res, next));

router.get('/bulk/email', validateBulkEmailMiddleware, (req: Request, res: Response, next: NextFunction) => notificationsController.sendEmail(req, res, next));


export default router;