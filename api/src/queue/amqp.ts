import { Channel, connect } from 'amqplib'
import config from 'convict-config';


let channel: Channel;
const url = config.get('amqp.host');
export async function startChannel() {
    const connection = await connect(url);
    channel = await connection.createChannel();
}

export async function getChannel(): Promise<Channel> {
    if (!channel) await startChannel();
    return channel;
}
