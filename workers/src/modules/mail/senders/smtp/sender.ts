import { Transporter } from "nodemailer";
import { Service } from "typedi";
import { getTransporter } from "./config";
import { BaseSender } from "../sender.interface";
import { MailOptions } from "../models";
import { logger } from "winston-config";

@Service()
export class SMTPSender implements BaseSender {
    private readonly transporter: Transporter
    constructor() {
        this.transporter = getTransporter()
    }
    sendMail(mailOptions: MailOptions): void {
        this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                logger.error(error.message);
            } else {
                logger.info('Email sent: ' + info.response);
            }
        });
    }


}