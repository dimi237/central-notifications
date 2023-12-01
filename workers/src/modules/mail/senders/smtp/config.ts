import config from 'convict-config';
import { Transporter, createTransport } from 'nodemailer';

let transporter: Transporter;
export const startTransporter = () => {

    transporter = createTransport({
        host: config.get('smtp.host'),
        port: +config.get('smtp.port'),
        auth: {
            user: config.get('smtp.auth.user'),
            pass: config.get('smtp.auth.password'),
        },
    });
}

export const getTransporter = () => {
    if (!transporter) { startTransporter() }
    return transporter;
}

