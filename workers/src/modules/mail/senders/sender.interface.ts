import { MailOptions } from "./models";

export interface BaseSender {
    sendMail(mailOptions: MailOptions): void;

}