import statusCodes from "@config/constants/statusCodes";
import { Request, Response } from "express";
import { isLeft, unwrapEither } from "utils/functions/either";
import { InternalError, NotFoundError } from "utils/models/Error";
import { CustomResponse } from "utils/models/Request";
import { emailValidator } from "utils/validators";
import { UserData } from "../model/User";
import UserRepository from "../repository/UserRepository";

type UserErrorResponse = Response<NotFoundError> | Response<InternalError>;

class UserService {
  constructor(private repository: UserRepository) {}

  public findByEmail = async (
    request: Request,
    response: Response
  ): Promise<UserErrorResponse | CustomResponse<UserData>> => {
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

      const user = unwrapEither(userOrError);
      return response.json(user).send();
    } catch (error) {
      return response
        .status(statusCodes.INTERNAL_ERROR)
        .json({ message: (error as Error).message })
        .send();
    }
  };
}

export default new UserService(new UserRepository());
