import {
  isLeft,
  makeLeft,
  makeRight,
  unwrapEither
} from "@utils/functions/either";
import { Either } from "@utils/models/Either";
import { BadRequestError, ForbiddenError } from "@utils/models/Error";
import { emailValidator, passwordValidator } from "@utils/validators";
import bcrypt from "bcrypt";
import { Login } from "../model/Auth";

export const loginValidator = (data: Login): Either<BadRequestError, true> => {
  const { email, password } = data;

  const emailOrError = emailValidator(email);
  const passwordOrError = passwordValidator(password);

  if (isLeft(emailOrError)) {
    const emailError = unwrapEither(emailOrError);
    return makeLeft(new BadRequestError(emailError.message));
  }

  if (isLeft(passwordOrError)) {
    const passwordError = unwrapEither(passwordOrError);
    return makeLeft(new BadRequestError(passwordError.message));
  }

  return makeRight(true);
};

export const userPasswordValidator = async (
  password: string,
  hash: string
): Promise<Either<ForbiddenError, true>> => {
  const isValid = await bcrypt.compare(password, hash);

  if (!isValid) {
    return makeLeft(new ForbiddenError("Incorrect password"));
  }

  return makeRight(true);
};
