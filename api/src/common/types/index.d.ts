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

declare type DataId = string | number;

declare type QueryResult = {
    status?: number;
    message?: string;
    data?: unknown;
}

declare type Address = {
    region?: string;
    commercialRegion?: string;
    city?: string;
    district?: string;
}

declare type Point = {
    validated: number;
    unvalidated: number;
    archived: number;
}

declare type QueueData = {
    subject: string,
    receiver: string,
    body: string,
    date: Date,
    cc?: string,
    attachments?: string
}

declare type QueueItem = {
    type: string,
    proc: Date,
    data: QueueData,
    priority: number;
}

declare type QueueOptions = {
    priority?: number;
    cc?: string;
    delay?: Date | number;
}

type AppAuthorization = {
    label: string;
    actions: string[];
}

declare type DataNotMigrate = {
    _id: string;
    error?: {
        message: string;
        stack: string;
    };
    data: unknown; 
}



declare type PaginationParam = 'offset' | 'limit';

declare type SortingParam = 'sort' | 'way';

declare type FilterParam = (PaginationParam & SortingParam & 'projection') extends keyof QueryOptions ? PaginationParam | SortingParam | 'projection' : never;

declare type TemplateData = ObjectType<string | number>

declare type getAllResult = {
    data: ObjectType<unknown>[],
    count: number
}

declare type Tonnage = {
    capacity: number;
    capacityPerYear: number;
    capacityLeft?: number;
}