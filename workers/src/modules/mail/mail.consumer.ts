import { Container } from 'typedi';
import { EmailService } from './mail.service';
import { BulkNotifications, Email } from 'common/models';

const emailService = Container.get(EmailService)

const emailConsumer = (queue: string, data: Email | BulkNotifications) => {
    if (queue === 'email') {
        emailService.sendEmail(data as Email);
    }

    if (queue === 'bulkEmail') {
        emailService.sendBulkEmail(data as BulkNotifications);
    }
}


export default emailConsumer;