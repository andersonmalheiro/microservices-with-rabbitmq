import { apiSecret } from "@config/constants/secrets";
import statusCodes from "@config/constants/statusCodes";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { isLeft, unwrapEither } from "utils/functions/either";
import {
  InternalError,
  NotFoundError,
  UnauthorizedError,
} from "utils/models/Error";
import { CustomResponse } from "utils/models/Request";
import { AuthUser } from "../../auth/model/Auth";
import UserRepository from "@modules/user/repository/UserRepository";
import { loginValidator, userPasswordValidator } from "../validators/login";

type ErrorResponse = Response<UnauthorizedError> | Response<InternalError>;

class AuthService {
  constructor(private repository: UserRepository) {}

  public async getAccessToken(
    request: Request,
    response: Response
  ): Promise<ErrorResponse | CustomResponse<AuthUser>> {
    try {
      const { email, password } = request.body;

      const loginOrError = loginValidator({ email, password });

      if (isLeft(loginOrError)) {
        const loginError = unwrapEither(loginOrError);
        return response
          .status(loginError.statusCode)
          .json({ message: loginError.message })
          .send();
      }

      const userOrError = await this.repository.findByEmail(email as string);

      if (isLeft(userOrError)) {
        const userError = unwrapEither(userOrError);
        return response
          .status(userError.statusCode)
          .json({ message: userError.message })
          .send();
      }

      const user = unwrapEither(userOrError);

      const passwordOrError = await userPasswordValidator(
        password,
        user.password
      );

      if (isLeft(passwordOrError)) {
        const passwordError = unwrapEither(passwordOrError);
        return response
          .status(passwordError.statusCode)
          .json({ message: passwordError.message })
          .send();
      }

      const authUser: AuthUser = { id: user.id, name: user.name, email };
      const accessToken = jwt.sign({ authUser }, apiSecret, {
        expiresIn: "1d",
      });

      return response.status(statusCodes.SUCCESS).json({ accessToken }).send();
    } catch (error) {
      return response
        .status(statusCodes.INTERNAL_ERROR)
        .json({ message: (error as Error).message })
        .send();
    }
  }
}

export default new AuthService(new UserRepository());
