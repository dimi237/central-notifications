import { NextFunction, Request, Response } from 'express';
import { UsersService } from "./users.service";
import { User } from "./models";
import { Service } from "typedi";


@Service()
export class UsersController {

    constructor(private readonly usersService: UsersService) {
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try { res.send(await this.usersService.createUser(req.body as User)); }
        catch (error) { next(error); }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try { res.send(await this.usersService.findOne({ filter: req.query })); }
        catch (error) { next(error); }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try { res.send(await this.usersService.getUserById(req.query)); }
        catch (error) { next(error); }
    }

}
