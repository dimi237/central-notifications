
import { Service } from "typedi";
import { BulkNotifications, Email } from "common";
import { logger } from "winston-config";
import { SMTPSender } from "./senders/smtp"
import { MailOptions } from "./senders/models";
import config from "convict-config";

@Service()
export class EmailService {
    constructor(private readonly smtpSender: SMTPSender) { }

    async sendBulkEmail(data: BulkNotifications) {
        try {
            logger.debug(JSON.stringify(data))
        }
        catch (error) { throw (error); }
    }

    async sendEmail(data: Email) {
        try {
            const mailOptions: MailOptions = {
                from: config.get('mailSender'),
                subject: data.object,
                text: data.message,
                to: data.email
            }
            this.smtpSender.sendMail(mailOptions);

        }
        catch (error) { throw (error); }
    }

}
