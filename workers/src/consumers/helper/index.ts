import { Channel, ConsumeMessage } from 'amqplib';
import config from 'convict-config';
import CryptoJS from 'crypto-js';

const secretKey = config.get('amqp.secret');

const getMessage = async (queue: string, msg: string, callback: Function) => {
    const data = decryptUsingAES256(msg);
    await callback(queue, data);
}

export const consume = (queue: string, channel: Channel, callback: Function) => {
    channel.assertQueue(queue, { durable: true })
        .then(() => channel.prefetch(1))
        .then(() => channel.consume(queue, async (msg: ConsumeMessage | null) => {
            if (msg) {
                getMessage(queue, msg.content.toString(), callback)
                    .then(() => channel.ack(msg));
            }

        }, { noAck: false })
        );
}



const decryptUsingAES256 = (encrypted: any) => {
    if (!encrypted) { return null; }
    const KEY = CryptoJS.enc.Utf8.parse(secretKey);
    const IV = CryptoJS.enc.Utf8.parse(secretKey);

    const decrypted = CryptoJS.AES.decrypt(
        encrypted, KEY, {
        keySize: 16,
        iv: IV,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);

    return JSON.parse(decrypted);
}