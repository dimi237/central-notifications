import { config } from 'convict-config';

export const isProd = ['production'].includes(config.get('env'));

export const isProdOrStag = ['production', 'staging'].includes(config.get('env'));

export const extractPaginationData = (query: QueryOptions): QueryOptions => {
  setParam('offset', query);
  setParam('limit', query);

  return query
}

export const extractSortingData = (query: QueryOptions): QueryOptions => {
  setParam('sort', query);
  setParam('way', query);

  return query
}

export const extractProjectionData = (query: QueryOptions): QueryOptions => {
  setParam('projection', query);

  if (typeof query.projection == 'string')
    query.projection = setProjection(query.projection as unknown as string);

  return query;
}

function setParam(param: FilterParam, query: QueryOptions) {
  if (query.filter && `${param}` in query.filter) {
    query[param] = query.filter[param];
    delete query.filter[param];
  }
}

function setProjection(field: string) {
  return field.split(',').reduce((o, key) => ({ ...o, [key]: 1 }), {});
}

export const setResponse = (status: number, message: string, data?: unknown): QueryResult => {
  return (data) ? { status, message, data } : { status, message };
}

class httpError {
  code = 500;
  message = 'internal server error';
  stack: unknown;
}

export class httpForbidden extends httpError {
  constructor(message: string, stack = null) {
    super();
    this.code = 403;
    this.message = message
    this.stack = stack;
  }
}

export const convertParams = (query: QueryOptions): QueryOptions => {
  if (query.filter) {
    for (const key in query.filter) {
      if (['true'].includes(query.filter[key])) { query.filter[key] = true; }
      if (query.filter[key] === 'false') { query.filter[key] = false; }
      if (RegExp(/[a-z]/i).test(query.filter[key])) { continue; }
      query.filter[key] = !isNaN(query.filter[key]) ? +query.filter[key] : query.filter[key];
    }
  }

  if (query.limit) { query.limit = +query.limit; }
  if (query.offset) { query.limit = +query.offset; }

  return query;
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

declare type QueryFilter = ObjectType<any>

declare type QueryProjection = ObjectType<number>


declare type PaginationParam = 'offset' | 'limit';

declare type SortingParam = 'sort' | 'way';

declare type FilterParam = (PaginationParam & SortingParam & 'projection') extends keyof QueryOptions ? PaginationParam | SortingParam | 'projection' : never;

declare type QueryResult = {
  status?: number;
  message?: string;
  data?: unknown;
}
