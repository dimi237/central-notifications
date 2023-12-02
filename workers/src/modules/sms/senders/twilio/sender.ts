import { Service } from "typedi";
import { BaseSender } from "../sender.interface";
import { SmsOptions } from "../models";
import { logger } from "winston-config";
import { Twilio } from "twilio";

@Service()
export class TwilioSender implements BaseSender {
    private readonly client: Twilio
    constructor() {
    }
    async sendSMS(smsOptions: SmsOptions): Promise<void> {
        await this.client.messages.create(smsOptions, function (error, info) {
            if (error) {
                logger.error(error.message);
            } else {
                logger.info('Sms sent: ' + info);
            }
        });
    }


}