/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { isProd } from 'common/helpers';
import { logger } from "winston-config";
import { ValidationError } from 'joi';

/**
 * @description Default error handler to be used with express
 * @param err Error object
 * @param {object} req Express req object
 * @param {object} res Express res object
 * @param {function} next Express next object
 * @returns {*}
 */
export async function ErrorHandler(err: Error | any, req: Request, res: Response, next: NextFunction): Promise<unknown> {
    let parsedError = '';
    if (err instanceof ValidationError) {
        res.status(400).send(err.message);
        return logger.error(`Validation Error: ${err.message}`);
      }

    // Attempt to gracefully parse error object
    try {
        parsedError = (err && typeof err === "object") ? err.stack : err;
    } catch (e: any) {
        logger.error(e.stack);
    }

    // Log the original error
    logger.error(parsedError);

    // If response is already sent, don't attempt to respond to client
    if (res.headersSent) { return next(err); }

    res.status(500).json({
        success: false,
        status: err.statusCode || 500,
        message: err.message || 'Internal server error',
        stack: isProd ? {} : err.stack
    });
}
