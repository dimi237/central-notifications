import { Service } from "typedi";
import { getChannel } from "./amqp";
import { encryptUsingAES256 } from "./helpers";


@Service()
export class ChannelService {

    async sendToqueue(queue: string, data: unknown) {
        try {
            const channel = await getChannel();
            channel.assertQueue(queue, {
                durable: true
            });
            const msg = encryptUsingAES256(data);
            channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
        }
        catch (error) { throw (error); }
    }


}