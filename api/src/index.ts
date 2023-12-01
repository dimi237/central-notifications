import 'module-alias/register';
import "reflect-metadata";
import { logger } from 'winston-config';
import { ExpressLoader } from 'loaders/express';
import { startDatabase } from 'database/mongodb';
import { startChannel } from 'queue/amqp';

startDatabase().then(async () => {
    logger.info("Database connection successful");
    startChannel().then(async () => {
        logger.info("amqp channel  successful");
        new ExpressLoader();
    }).catch((err: Error) => {
        console.error(err.stack);
        logger.error("amqp channel connection failed \n", err.stack || '');
    });
}).catch((err: Error) => {
    console.error(err.stack);
    logger.error("Database connection failed \n", err.stack || '');
});