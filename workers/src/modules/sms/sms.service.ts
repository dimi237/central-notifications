import { BulkNotifications, Sms } from "common/models";
import { Service } from "typedi";
import { logger } from "winston-config";

@Service()
export class SmsService {
    constructor() { }

    async sendBulkSms(data: BulkNotifications) {
        try {
            logger.debug(JSON.stringify(data))
        }
        catch (error) { throw (error); }
    }

    async sendSms(data: Sms) {
        try {
            logger.debug(JSON.stringify(data))

        }
        catch (error) { throw (error); }
    }

}
