
import { Service } from "typedi";
import { BulkNotifications, Email, Sms, Notification } from "./models";
import { ChannelService } from "queue/channel";


@Service()
export class NotificationsService {
    constructor(private readonly channelService: ChannelService) { }

    async sendBulkEmail(data: BulkNotifications) {
        try {
            return await this.sendToqueue('bulkEmail', data)
        }
        catch (error) { throw (error); }
    }

    async sendBulkSms(data: BulkNotifications) {
        try {
            return await this.sendToqueue('bulkSms', data)
        }
        catch (error) { throw (error); }
    }

    async sendEmail(data: Email) {
        try {
            return await this.sendToqueue('email', data)
        }
        catch (error) { throw (error); }
    }

    async sendSms(data: Sms) {
        try {
            return await this.sendToqueue('sms', data)
        }
        catch (error) { throw (error); }
    }


    private async sendToqueue(queue: string, data: Notification | BulkNotifications) {
        data.status = 'PENDING';
        await this.channelService.sendToqueue(queue, data);
        return {
            message: 'Sent to queue',
            status: data.status
        };

    }

}
