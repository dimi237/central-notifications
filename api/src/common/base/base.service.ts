import { convertParams, extractPaginationData, extractProjectionData, extractSortingData, setResponse } from '../helpers';
import { BaseRepository } from './base.repository';
import { ServiceInterface, BaseModel } from '../interfaces';
import { errorMsg, respMsg } from 'common';
import { Document, WithId } from 'mongodb';
import { logger } from "winston-config";
import moment from 'moment';
import { Service } from 'typedi';


@Service()
export abstract class BaseService<T extends BaseModel> implements ServiceInterface {

  protected logger;
  
  constructor(protected readonly repository: BaseRepository) {
    this.logger = logger;
  }

  async create(data: any): Promise<QueryResult> {
    try {
      data.enabled ??= true;
      data.dates.created ??= moment().valueOf();

      const newDocument = await this.repository.create(data);

      if (!newDocument.insertedId)
        throw new Error(errorMsg.ON_CREATION);

      return setResponse(200, respMsg.CREATED, newDocument.insertedId);
    } catch (error) { throw error; }
  }

  async findAll(query: QueryOptions): Promise<getAllResult<T>> {
    try {
      query = convertParams(query || {});
      query = extractPaginationData(query);
      query = extractSortingData(query);
      query = extractProjectionData(query);

      const data = await this.repository.findAll(query || {}) || [];
      const count = await this.count(query?.filter || {}) || 0;

      return { data, count };

    } catch (error) { throw error; }
  }

  async findAllAggregate(aggregation: unknown): Promise<Document[]> {
    try {
      return await this.repository.findAllAggregate(aggregation ?? []);
    } catch (error) { throw error; }
  }

  async findOne(query: QueryOptions): Promise<WithId<T>> {
    try {
      const document =  this.repository.findOne(query);

      // if (!document) throw new Error(errorMsg.NOT_FOUND);

      return document as unknown as WithId<T>;
    } catch (error) { throw error; }
  }

  async count(query: QueryFilter): Promise<number> {
    try {
      const numberOfDocuments = await this.repository.count(query);

      return numberOfDocuments;
    } catch (error) { throw error; }
  }

  async update(filter: QueryFilter, data: T): Promise<QueryResult> {
    try {
      const existVerify = await this.repository.findOne({ filter });
      if (!existVerify) throw new Error(errorMsg.NOT_FOUND);
      delete data._id;

      const updatedDocument = await this.repository.update(filter, data);

      if (!updatedDocument.acknowledged)
        throw new Error(errorMsg.ON_UPDATE);

      return setResponse(200, respMsg.UPDATED);
    } catch (error) { throw error; }
  }

}

declare type ObjectType<T> = {
  [key: string]: T
}

declare type QueryOptions = {
  filter?: QueryFilter,
  projection?: QueryProjection,
  limit?: number,
  offset?: number,
  sort?: any,
  way?: 1 | -1,
}

declare type QueryFilter = ObjectType<any>

declare type QueryProjection = ObjectType<number>

declare type getAllResult<T> = {
  data: ObjectType<T>[],
  count: number
}

declare type QueryResult = {
  status?: number;
  message?: string;
  data?: any;
}
