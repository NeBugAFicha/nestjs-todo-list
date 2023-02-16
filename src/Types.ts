import { RequestHandler } from 'express';
import { ObjectSchema } from 'joi';

export type RouteInterface<T = any> = {
  body?: T;
  param?: T;
  query?: T;
};

export type GenericObject<T = any> = {
  [key: string]: T;
};

export type GenericRoute = {
  [key: string]: RouteInterface<GenericObject>;
};
// export interface ExtendedRequest<
//   ReqParam = GenericObject,
//   ReqBody = GenericObject,
//   ReqQuery = GenericObject,
// > extends RequestHandler{
//   body: ReqBody;
//   param: ReqParam;
//   query: ReqQuery;
// }

// export type RouteRequest<T extends RouteInterface> = ExtendedRequest<T['param'], T['body'], T['query']>;

export type ControllerMethods<T extends GenericRoute> = {
  [key in keyof T]: (
    current_user_id: number,
    param: T[key]['param'],
    body: T[key]['body'],
    query: T[key]['query'],
  ) => Promise<void | GenericObject>;
};

// current_user_id?: number,
// param?: T[key]['param'],
// body?: T[key]['body'],
// query?: T[key]['query'],
export type SchemaType<T extends GenericRoute> = {
  [key in keyof T]: RouteInterface<ObjectSchema>;
};

export type RouterType<T extends GenericRoute> = {
  generalPath: string;
  routes: {
    [key in keyof T]: {
      path: string;
      method: string;
    };
  };
};
