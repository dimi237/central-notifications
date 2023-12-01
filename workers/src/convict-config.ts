import convict from 'convict';

// Define a schema
export const config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'staging', 'staging-bci'],
        default: 'development',
        env: 'NODE_ENV'
    },
    ip: {
        doc: 'The IP address to bind.',
        format: String,
        default: '127.0.0.1',
        env: 'IP_ADDRESS',
    },
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 3000,
        env: 'PORT',
        arg: 'port'
    },
    host: {
        doc: 'Application host.',
        format: '*',
        default: 'localhost',
    },

    db: {
        host: {
            doc: 'Database host name/IP',
            format: '*',
            default: '127.0.0.1:27017',
            env: 'DB_MONGO_HOST'
        },
        name: {
            doc: 'Database name',
            format: String,
            default: '',
            env: 'DB_MONGO_NAME'
        },
        auth: {
            user: {
                doc: 'Database user if any',
                format: String,
                default: '',
                env: 'DB_MONGO_USERNAME'
            },
            password: {
                doc: 'Database password if any',
                format: String,
                default: '',
                env: 'DB_MONGO_PASSWORD'
            }
        },

    },
    amqp: {
        host: {
            doc: 'amqp host name/IP',
            format: '*',
            default: 'amqp://localhost',
            env: 'AMQP_HOST'
        },

        secret: {
            doc: 'amqpHost secret',
            format: '*',
            default: '',
            env: 'AMQP_SECRET'
        },

    },
    mailProvider: {
        doc: 'email provider.',
        format: '*',
        default: 'smtp',
        env: 'MAIL_PROVIDER'
    },
    mailSender: {
        doc: 'email sender.',
        format: '*',
        default: 'smtp',
        env: 'MAIL_Sender'
    },
    smsProvider: {
        doc: 'sms provider.',
        format: '*',
        default: 'smtp',
        env: 'SMS_PROVIDER'
    },
    smtp: {
        host: {
            doc: 'SMTP host name/IP',
            format: String,
            default: '',
            env: 'SMTP_HOST'
        },
        port: {
            doc: 'SMTP port',
            format: String,
            default: '',
            env: 'SMTP_PORT'
        },
        auth: {
            user: {
                doc: 'smtp user',
                format: String,
                default: '',
                env: 'SMTP_USER'
            },
            password: {
                doc: 'smtp password',
                format: String,
                default: '',
                env: 'SMTP_PASSWORD'
            }
        },

    },
});

// Load environment dependent configuration
const env = config.get('env');
config.loadFile('./src/envs/' + env + '.json');

// Perform validation
config.validate({ allowed: 'strict' });

export default config;