import { BulkNotifications, Sms } from "common/models";
import { Service } from "typedi";
import { logger } from "winston-config";
import { TwilioSender } from "./senders/twilio";
import { SmsOptions } from "./senders/models";
import config from "convict-config";

@Service()
export class SmsService {
    constructor(private readonly twilioSender: TwilioSender) { }

    async sendBulkSms(data: BulkNotifications) {
        try {
            logger.debug(JSON.stringify(data))
        }
        catch (error) { throw (error); }
    }

    async sendSms(data: Sms) {
        try {
            const smsOptions: SmsOptions = {
                body: data.message,
                from: config.get('smsSender'),
                to: data.tel
            }
            await this.twilioSender.sendSMS(smsOptions);
        }
        catch (error) { throw (error); }
    }

}
