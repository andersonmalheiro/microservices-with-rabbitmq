import { makeLeft, makeRight } from "./functions/either";
import { Either } from "./models/Either";

export const emailValidator = (value?: string): Either<Error, boolean> => {
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
