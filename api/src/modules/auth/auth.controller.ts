import { NextFunction, Request, Response } from 'express';
import { AuthService } from "./auth.service";
import { Service } from "typedi";


@Service()
export class AuthController {


    constructor(
        private readonly authService: AuthService
    ) {
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try { res.send(await this.authService.login(req.body)); }
        catch (error) { next(error); }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try { res.send(await this.authService.refresh(req.body)); }
        catch (error) { next(error); }
    }


}
