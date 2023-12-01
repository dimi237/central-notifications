import { Container } from 'typedi';
import { BulkNotifications, Sms } from 'common/models';
import { SmsService } from './sms.service';

export const smsService = Container.get(SmsService)


const smsConsumer = (queue: string, data: Sms | BulkNotifications) => {
    if (queue === 'sms') {
        smsService.sendSms(data as Sms);
    }

    if (queue === 'bulkSms') {
        smsService.sendBulkSms(data as BulkNotifications);
    }
}



export default smsConsumer;