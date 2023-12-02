import config from 'convict-config';
import twilio, { Twilio } from 'twilio';

let client: Twilio;
const startClient = () => {
    client = twilio(config.get('twilio.accountId'), config.get('twilio.token'));
}

export const getClient = () => {
    if (!client) { startClient() }
    return client;
}

