import { NextFunction, Request, Response } from 'express';

export interface controllerInterface {

    create(req: Request, res: Response, next: NextFunction): Promise<void>;

    findAll(req: Request, res: Response, next: NextFunction): Promise<void>;

    findOne(req: Request, res: Response, next: NextFunction): Promise<void>;

    count(req: Request, res: Response, next: NextFunction): Promise<void>;

    update(req: Request, res: Response, next: NextFunction): Promise<void>;

}
