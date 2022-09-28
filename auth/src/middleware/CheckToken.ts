import { apiSecret } from "@config/constants/secrets";
import statusCodes from "@config/constants/statusCodes";
import { AuthUser } from "@modules/user/model/Auth";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const BEARER = "bearer ";

const checkTokenMiddleware: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      return response
        .status(statusCodes.UNAUTHORIZED)
        .json({ message: "Access token was not informed" })
        .send();
    }

    let token = authorization.slice();
    if (token.toLocaleLowerCase().includes(BEARER)) {
      token = token.replace(BEARER, "");
    }

    const decodeToken = promisify(jwt.verify) as any;
    const decoded: AuthUser = await decodeToken(token, apiSecret, {});
    request.authUser = decoded;

    return next();
  } catch (error) {
    return response
      .status(statusCodes.INTERNAL_ERROR)
      .json({ message: (error as Error).message })
      .send();
  }
};

export default checkTokenMiddleware;
