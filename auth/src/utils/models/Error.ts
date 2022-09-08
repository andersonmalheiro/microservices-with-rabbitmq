import statusCodes from "@config/constants/statusCodes";

export class HttpError extends Error {
  public statusCode!: number;

  constructor(message: string, statusCode: statusCodes) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, statusCodes.NOT_FOUND);
    this.name = "NotFoundError";
  }
}

export class InternalError extends HttpError {
  constructor(message: string) {
    super(message, statusCodes.INTERNAL_ERROR);
    this.name = "InternalError";
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, statusCodes.BAD_REQUEST);
    this.name = "BadRequestError";
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message, statusCodes.FORBIDDEN);
    this.name = "ForbiddenError";
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(message, statusCodes.UNAUTHORIZED);
    this.name = "UnauthorizedError";
  }
}
