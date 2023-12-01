import { Container, Service } from 'typedi';
import { AuthController } from './auth.controller';
import express, { NextFunction, Request, Response } from 'express';
import { validateLoginMiddleware } from './middleware';

@Service()
class AuthenticationRouter {
    constructor(private readonly authController: AuthController) { }
    getRouter() {
        const router = express.Router();
        router.post('/login', validateLoginMiddleware, (req: Request, res: Response, next: NextFunction) => this.authController.login(req, res, next));
        router.get('/refresh', (req: Request, res: Response, next: NextFunction) => this.authController.refresh(req, res, next));
        return router
    }
}

const authRouter = Container.get(AuthenticationRouter)
const router = authRouter.getRouter()

export default router;