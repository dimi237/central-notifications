import moment from "moment";
import jwt from 'jsonwebtoken';
import { Token } from "../models";
import { config } from 'convict-config';

export const create = (payload: any): Token => {
    const issued = getCurrDateSeconds();
    const ttl = issued + parseInt(config.get('tokenTTL'), 10);
    const options = { expiresIn: `${ttl}` }

    const access_token = jwt.sign({ payload }, `${config.get('tokenSalt')}`, options);

    const refresh_token = jwt.sign({ payload }, `${config.get('tokenSalt')}`, options);

    return { access_token, refresh_token, token_type: 'Bearer', issued, expires_in: ttl }
}

export const refresh = (token: string): any => {
    const payload: any = jwt.verify(token, `${config.get('tokenSalt')}`);
    delete payload.iat;
    delete payload.exp;
    delete payload.nbf;

    const options = { expiresIn: `99999999999999` };

    return jwt.sign({ payload }, `${config.get('tokenSalt')}`, options);
}

const getCurrDateSeconds = (): number => {
    return moment().valueOf() / 1000 | 0;
}