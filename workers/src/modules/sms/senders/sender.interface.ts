import { SmsOptions } from "./models";

export interface BaseSender {
    sendSMS(smsOptions: SmsOptions): void;

}