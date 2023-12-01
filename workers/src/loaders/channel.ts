import consumer from "consumers";
import { getChannel } from "queue/amqp";

export class ChannelLoader {
    public static async Listen() {
        const channel = await getChannel();
        consumer(channel);
    }
}