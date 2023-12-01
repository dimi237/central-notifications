import { Collection, Document, InsertOneResult, ObjectId, UpdateResult, WithId } from 'mongodb';
import { RepositoryInterface } from '../interfaces';
import * as db from 'database/mongodb';
import { Service } from "typedi";


@Service()
export class BaseRepository implements RepositoryInterface {
  protected collectionName: string = '';

  constructor() {
    if (!this.collectionName)
      this.collectionName = this.getCollectionName();
  }

  async create(document: globalThis.Document): Promise<InsertOneResult<globalThis.Document>> {
    try {
      return (await this.getCollection()).insertOne(document);
    } catch (error) { throw (error); }
  }

  async findAll(query?: QueryOptions): Promise<Document[]> {
    try {
      return (await this.getCollection())
        .find(query?.filter ?? {})
        .project(query?.projection ?? {})
        .sort(query?.sort ?? '_id', query?.way ?? -1)
        .skip(query?.offset ?? 0)
        .limit(query?.limit ?? 0)
        .toArray();
    } catch (error) { throw (error); }
  }

  async findAllAggregate(agregation: any): Promise<Document[]> {
    try {
      return (await this.getCollection()).aggregate(agregation ?? []).toArray();
    } catch (error) { throw (error); }
  }

  async findOne(query: QueryOptions): Promise<WithId<globalThis.Document> | null> {
    try {
      this.setMongoId(query.filter || {});

      return (await this.getCollection()).findOne(query.filter || {}, { projection: query.projection ?? {} });
    } catch (error) { throw (error); }
  }

  async findById(id: string): Promise<WithId<globalThis.Document> | null> {
    try {

      return (await this.getCollection()).findOne({ _id: new ObjectId(id) });
    } catch (error) { throw (error); }
  }

  async count(query: QueryFilter): Promise<number> {
    try {
      return (await this.getCollection()).countDocuments(query);
    } catch (error) { throw (error); }
  }

  async update(filter: QueryFilter, document: Document): Promise<UpdateResult> {
    try {
      this.setMongoId(filter);

      return (await this.getCollection()).updateOne(filter, { $set: document });
    } catch (error) { throw (error); }
  }

  async updateDeleteFeild(filter: QueryFilter, document: Document): Promise<UpdateResult> {
    try {
      this.setMongoId(filter);

      return (await this.getCollection()).updateOne(filter, { $unset: document });
    } catch (error) { throw (error); }
  }

  protected async getCollection(): Promise<Collection<globalThis.Document>> {
    try {
      return await db.getCollection(this.collectionName);
    } catch (error) { throw (error); }
  }

  private getCollectionName(): string {
    const name = this.constructor.name.replace('Repository', '').toLowerCase();

    if (name.slice(-1) == 'y') return name.replace('y', 'ies');

    return name;
  }

  private setMongoId(filter: QueryFilter): void {
    if ('_id' in filter)
      filter._id = new ObjectId(filter._id.toString());
  }
}


declare type ObjectType<T> = {
  [key: string]: T
}

export declare type QueryOptions = {
  filter?: QueryFilter,
  projection?: QueryProjection,
  limit?: number,
  offset?: number,
  sort?: string,
  way?: 1 | -1,
}

export declare type QueryFilter = ObjectType<any>

export declare type QueryProjection = ObjectType<number>
