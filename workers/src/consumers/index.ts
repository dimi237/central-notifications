
import { Channel } from 'amqplib'
import { consume } from './helper';
import smsConsumer from 'modules/sms/sms.consumer';
import emailConsumer from 'modules/mail/mail.consumer';

const consumer = (channel: Channel) => {
    consume('sms', channel, smsConsumer)

    consume('bulkSms', channel, smsConsumer)

    consume('email', channel, emailConsumer)

    consume('bulkEmail', channel, emailConsumer)
};



export default consumer;
