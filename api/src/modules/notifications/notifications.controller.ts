import { NextFunction, Request, Response } from 'express';
import { NotificationsService } from "./notifications.service";
import { BulkNotifications, Email, Sms } from "./models";
import { Service } from "typedi";


@Service()
export class NotificationsController {

    constructor(private readonly notificationsService: NotificationsService) {
    }

    async sendEmail(req: Request, res: Response, next: NextFunction) {
        try { res.send(await this.notificationsService.sendEmail(req.body as Email)); }
        catch (error) { next(error); }
    }

    async sendSms(req: Request, res: Response, next: NextFunction) {
        try { res.send(await this.notificationsService.sendSms(req.body as Sms)); }
        catch (error) { next(error); }
    }


    
    async sendBulkEmail(req: Request, res: Response, next: NextFunction) {
        try { res.send(await this.notificationsService.sendBulkEmail(req.body as BulkNotifications)); }
        catch (error) { next(error); }
    }

    async sendBulkSms(req: Request, res: Response, next: NextFunction) {
        try { res.send(await this.notificationsService.sendBulkSms(req.body as BulkNotifications)); }
        catch (error) { next(error); }
    }

}
