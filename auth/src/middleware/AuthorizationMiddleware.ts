import { apiSecret } from "@config/constants/secrets";
import statusCodes from "@config/constants/statusCodes";
import { AuthUser } from "@modules/auth/model/Auth";
import { HttpError, UnauthorizedError } from "@utils/models/Error";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const AuthorizationMiddleware: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedError("Access token was not informed");
    }

    const tokenParts = authorization.slice().split(" ");
    let token = tokenParts.length > 1 ? tokenParts[1] : tokenParts[0];

    const decodeToken = promisify(jwt.verify) as any;
    const { authUser } = await decodeToken(token, apiSecret, {});
    request.authUser = authUser;

    return next();
  } catch (error) {
    const { message, statusCode, cause, stack } = error as HttpError;
    return response
      .status(statusCode ?? statusCodes.INTERNAL_ERROR)
      .json({
        message,
        cause,
        stack,
      })
      .send();
  }
};

export default AuthorizationMiddleware;
