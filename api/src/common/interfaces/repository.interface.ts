import { Document, InsertOneResult, UpdateResult, WithId } from "mongodb";

export interface RepositoryInterface {

    create(data: Document): Promise<InsertOneResult<Document>>;

    findAll(query?: QueryOptions): Promise<Document[]>;

    findOne(query: QueryOptions): Promise<WithId<globalThis.Document> | null>;

    count(query: QueryFilter): Promise<number>;

    update(filter: QueryFilter, data: Document): Promise<UpdateResult>;
}



declare type ObjectType<T> = {
    [key: string]: T
}

declare type QueryOptions = {
    filter?: QueryFilter,
    projection?: QueryProjection,
    limit?: number,
    offset?: number,
    sort?: string,
    way?: 1 | -1,
}

declare type QueryFilter = ObjectType<unknown>

declare type QueryProjection = ObjectType<number>
