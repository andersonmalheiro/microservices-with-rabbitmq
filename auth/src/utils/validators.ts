import { makeLeft, makeRight } from "./functions/either";
import { Either } from "./models/Either";

export const emailValidator = (value?: string): Either<Error, true> => {
  if (!value) {
    return makeLeft(new Error("Provided email must not be null or empty"));
  }

  const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

  const valueIsValid = emailRegex.test(value);

  if (!valueIsValid || typeof value !== "string") {
    return makeLeft(new Error("Provided email is not valid"));
  }

  return makeRight(true);
};

export const passwordValidator = (value?: string): Either<Error, true> => {
  const MIN_LENGTH = 6;
  const SPACE = " ";

  if (!value) {
    return makeLeft(new Error("Password must not be null or empty"));
  }

  if (value.includes(SPACE)) {
    return makeLeft(new Error("Password must not contain spaces"));
  }

  if (value.length < MIN_LENGTH) {
    return makeLeft(
      new Error(`Password must have at least ${MIN_LENGTH} characters`)
    );
  }

  return makeRight(true);
};
