// import { oauthVerification } from 'common/middelwares';
import { logger, morganOption } from "winston-config";
import { ErrorHandler, authVerification } from "common/middlewares";
import { json, urlencoded } from 'body-parser';
import  httpContext from 'express-http-context';
import { config } from 'convict-config';
import compression from 'compression';
import routes from 'routes/index';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
export class ExpressLoader {

    server: unknown;

    constructor() {
        const app = express();

        // adding Helmet to enhance your API's security
        app.use(helmet());

        // Serve static content
        app.use(express.static(path.join(__dirname, "uploads")));

        // Set up middleware
        // adding morgan to log HTTP requests
        const format = ':remote-addr - ":method :url HTTP/:http-version" :status :response-time ms - :res[content-length] ":referrer" ":user-agent"';
        app.use(morgan(format, morganOption));

        // using compression
        app.use(compression());

        // using bodyParser
        app.use(urlencoded({ extended: false, limit: "20mb" }));

        // using bodyParser to parse JSON bodies into JS objects
        app.use(json({ limit: "20mb" }));

        // enabling CORS for all requests
        app.use(cors({ origin: true, credentials: true }));

        // Apply middlewares
        app.use(httpContext.middleware);
        // app.use(authVerification);

        // Pass app to routes
        routes(app);

        // Setup error handling, this must be after all other middleware
        app.use(ErrorHandler);

        // set base API path
        const main = express().use(config.get('basePath') || '', app);

        // Start application
        this.server = main.listen(config.get('port'), config.get('host'), () => {
            logger.info(`${config.get('host')} server started. Listening on port ${config.get('port')} in "${config.get('env')}" mode`);
        });

    }

    get Server() {
        return this.server;
    }

}
