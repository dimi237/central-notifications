import beautify from 'json-beautify';
import { config } from './convict-config';
import winston from 'winston';
import { Options } from 'morgan';
import  moment from 'moment';
import { isEmpty } from 'lodash';
import fs from 'fs';

const { format, } = winston;
const { combine, timestamp, label, printf, metadata, colorize, errors } = format;

const dir = '../logs';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const customFormat = () => {
    return combine(
        errors({ stack: true }),
        metadata({}),
        timestamp(),
        printf(({ level, message, time, meta }) => {
            let out = `[${moment(time).format('DD/MMM/YYYY:HH:mm:ss ZZ')}] [${level}] ${message}\n\n`;

            if (meta && meta.error) {
                out += meta.methodPath ? `\n${meta.methodPath}` : '';
                out += `\n${meta.stack}`;
            } else if (meta && meta.query) {
                out += `\n${meta.query}`;
            } else if (!isEmpty(meta)) {
                out += `\n${beautify(meta, [], 2, 80)}`;
            }

            return out;
        })
    )
}


const loggerObj = winston.createLogger({
    level: 'silly',
    format: winston.format.json(),
    defaultMeta: {},
    transports: [
        new winston.transports.File({
            level: 'error',
            filename: `${process.cwd()}/logs/error.log`,
            maxsize: 41943040, // 40MB
            maxFiles: 5,
            handleExceptions: true,
            format: customFormat()
        }),
        new winston.transports.File({
            filename: `${process.cwd()}/logs/combined.log`,
            maxsize: 41943040, // 40MB
            maxFiles: 5,
            format: customFormat()
        }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
loggerObj.add(new winston.transports.Console({
    level: 'silly',
    format: customFormat(),
    handleExceptions: true
}));
// }

// And the code
export const morganOption: Options<any, any> = {
    stream: {
        write: (message: string) => {
            if (config.get('env') === 'test') { return }
            loggerObj.info(message.trim());
        },
    },
};

export const logger = {
    error: (msg: string, param1?: any, param2?: any, param3?: any) => {
        // if (config.get('env') === 'test') { return; }
        loggerObj.error(msg, param1, param2, param3);
    },
    warn: (msg: string, param1?: any, param2?: any, param3?: any) => {
        if (config.get('env') === 'test') { return; }
        loggerObj.warn(msg, param1, param2, param3);
    },
    verbose: (msg: string, param1?: any, param2?: any, param3?: any) => {
        if (config.get('env') === 'test') { return; }
        loggerObj.verbose(msg, param1, param2, param3);
    },
    info: (msg: string, param1?: any, param2?: any, param3?: any) => {
        if (config.get('env') === 'test') { return; }
        loggerObj.info(msg, param1, param2, param3);
    },
    debug: (msg: string, param1?: any, param2?: any, param3?: any) => {
        // if (config.get('env') === 'test') { return; }
        loggerObj.debug(msg, param1, param2, param3);
    },
    silly: (msg: string, param1?: any, param2?: any, param3?: any) => {
        if (config.get('env') === 'test') { return; }
        loggerObj.silly(msg, param1, param2, param3);
    }
}
