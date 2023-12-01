import { NextFunction, Request, Response } from 'express';
import { controllerInterface } from '../interfaces';
import { BaseService } from './base.service';
import { logger } from "winston-config";
import { BaseModel } from 'common/interfaces/model.interface';

export class BaseController<T extends BaseModel> implements controllerInterface {

  protected logger;
  protected srv;

  constructor(protected service: BaseService<T>) {
    this.logger = logger;
    this.srv = service;
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.srv.create(req.body)); }
    catch (error) { next(error); }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.srv.findAll({ filter: req.query })); }
    catch (error) { next(error); }
  }

  async findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.srv.findOne({ filter: req.query })); }
    catch (error) { next(error); }
  }

  async count(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.srv.count(req.query)); }
    catch (error) { next(error); }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try { res.send(await this.srv.update(req.query, req.body)); }
    catch (error) { next(error); }
  }

}
