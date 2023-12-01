import { Request, Response, NextFunction } from 'express';
import httpContext from 'express-http-context';
import { logger } from 'winston-config';
import { config } from 'convict-config';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const whiteList: { path: string, method?: string }[] = [
    { path: '/auth/login', method: 'POST' },
    { path: '/auth/refresh', method: 'POST' },
];

export  function authVerification(req: Request, res: Response, next: NextFunction) {
    const index = whiteList.findIndex(elt => req.path.includes(elt.path) && req.method === elt.method);
    if (index !== -1) { return next(); }

    // verify authentification for all others endpoint
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.includes(' ') || authorization.split(' ').length < 2) {
        return res.status(400).json({ message: 'missing or bad formatted token' });
    }

    const accessToken = authorization.split(' ')[1];

    try {
        const payloadata: JwtPayload = jwt.verify(accessToken, `${config.get('tokenSalt')}`) as JwtPayload;
        delete payloadata.exp;
        delete payloadata.iat;
        const user = payloadata.payload;
        httpContext.set('user', user);

        next();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.message === 'TokenExpired') {
            logger.error(`\nToken expired.`, error);
            return res.status(401).json({ type: 'TokenExpired' });
        }
        logger.error(`\nInvalid token.`, error);
        res.status(401).json({ message: 'invalid token.' });
    }

    return next();

}
