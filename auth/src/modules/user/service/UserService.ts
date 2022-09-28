import statusCodes from "@config/constants/statusCodes";
import { Request, Response } from "express";
import { isLeft, unwrapEither } from "utils/functions/either";
import { InternalError, NotFoundError } from "utils/models/Error";
import { CustomResponse } from "utils/models/Request";
import { emailValidator } from "@utils/validators";
import { loginValidator, userPasswordValidator } from "../validators/login";
import { User } from "../model/User";
import UserRepository from "../repository/UserRepository";
import jwt from "jsonwebtoken";
import { apiSecret } from "@config/constants/secrets";

type ErrorResponse = Response<NotFoundError> | Response<InternalError>;

class UserService {
  constructor(private repository: UserRepository) {}

  public findByEmail = async (
    request: Request,
    response: Response
  ): Promise<ErrorResponse | CustomResponse<Omit<User, "password">>> => {
    try {
      const { email } = request.query;

      const emailOrError = emailValidator(email as string);

      if (isLeft(emailOrError)) {
        const emailError = unwrapEither(emailOrError);

        return response
          .status(statusCodes.BAD_REQUEST)
          .json({ message: emailError.message })
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

      const { password, ...user } = unwrapEither(userOrError);

      return response.json(user).send();
    } catch (error) {
      return response
        .status(statusCodes.INTERNAL_ERROR)
        .json({ message: (error as Error).message })
        .send();
    }
  };

  public async getAccessToken(
    request: Request,
    response: Response
  ): Promise<ErrorResponse | undefined> {
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

      const authUser = { id: user.id, name: user.name, email };
      const accessToken = jwt.sign(authUser, apiSecret, { expiresIn: "1d" });

      return response
        .status(statusCodes.SUCCESS)
        .json({ accessToken })
        .send();
    } catch (error) {
      return response
        .status(statusCodes.INTERNAL_ERROR)
        .json({ message: (error as Error).message })
        .send();
    }
  }
}

export default new UserService(new UserRepository());
