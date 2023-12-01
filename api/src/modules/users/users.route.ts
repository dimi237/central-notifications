import Container from 'typedi';
import { validateCreateUserMiddleware } from './middleware';
import { UsersController } from './users.controller';
import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();
export const usersController = Container.get(UsersController);

router.post('/', validateCreateUserMiddleware, usersController.createUser);

router.get('/all', (req: Request, res: Response, next: NextFunction) => usersController.getUsers(req, res, next));

router.get('/pull', (req: Request, res: Response, next: NextFunction) => usersController.getUserById(req, res, next));


export default router;