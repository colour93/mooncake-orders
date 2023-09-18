export enum ResponseCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  NOT_AUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 502,
}

export interface ResponseRoot<T> {
  code: ResponseCode;
  msg: string;
  data: T;
}
