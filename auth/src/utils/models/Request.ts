import { Response } from "express";

export type ErrorResponse = Response<Error>;
export type CustomResponse<T> = Response<T>;
