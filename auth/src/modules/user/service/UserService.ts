import statusCodes from "@config/constants/statusCodes";
import { Request, Response } from "express";
import { isRight, unwrapEither } from "utils/functions/either";
import { ErrorResponse, CustomResponse } from "utils/models/Request";
import { emailValidator } from "utils/validators";
import { UserData } from "../model/User";
import UserRepository from "../repository/UserRepository";

class UserService {
  constructor(private repository: UserRepository) {}

  public findByEmail = async (
    request: Request,
    response: Response
  ): Promise<ErrorResponse | CustomResponse<UserData>> => {
    const { email } = request.query;

    const eitherEmailOrError = emailValidator(email as string);

    if (isRight(eitherEmailOrError)) {
      const eitherUserOrNull = await this.repository.findByEmail(
        email as string
      );

      if (isRight(eitherUserOrNull)) {
        const user = unwrapEither(eitherUserOrNull);
        return response.json(user).send();
      }

      return response
        .status(statusCodes.NOT_FOUND)
        .json({ message: "User not found" })
        .send();
    }

    const error = unwrapEither(eitherEmailOrError);
    return response
      .status(statusCodes.BAD_REQUEST)
      .json({ message: error.message })
      .send();
  };
}

export default new UserService(new UserRepository());
