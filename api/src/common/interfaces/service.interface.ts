import { Document, WithId } from "mongodb";

export interface ServiceInterface {

    create(data: Document): Promise<QueryResult>

    findAll(query?: QueryOptions): Promise<getAllResult>

    findOne(query: QueryOptions): Promise<WithId<Document> | QueryResult>

    count(query: QueryFilter): Promise<number | QueryResult>;

    update(filter: QueryFilter, data: Document): Promise<QueryResult>;

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

declare type getAllResult = {
    data: ObjectType<unknown>[],
    count: number
}

declare type QueryResult = {
    status?: number;
    message?: string;
    data?: unknown;
}
