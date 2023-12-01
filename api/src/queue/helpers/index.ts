import config from 'convict-config';
import CryptoJS from 'crypto-js';

const secretKey = config.get('amqp.secret');

export const encryptUsingAES256 = (data: any) => {
    const KEY = CryptoJS.enc.Utf8.parse(secretKey);
    const IV = CryptoJS.enc.Utf8.parse(secretKey);
    const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(data), KEY, {
        keySize: 16,
        iv: IV,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
}

