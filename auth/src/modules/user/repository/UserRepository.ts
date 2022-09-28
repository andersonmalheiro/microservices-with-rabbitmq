import { makeLeft, makeRight } from "utils/functions/either";
import { Either } from "utils/models/Either";
import { InternalError, NotFoundError } from "utils/models/Error";
import UserModel, { User } from "../model/User";

export default class UserRepository {
  async findById(id: number) {
    try {
      return await UserModel.findOne({
        where: { id },
      });
    } catch (error) {
      console.error(error);
    }
  }

  public async findByEmail(
    userEmail: string
  ): Promise<Either<NotFoundError | InternalError, User>> {
    try {
      const queryResult = await UserModel.findOne({
        where: { email: userEmail },
      });

      if (!queryResult) {
        return makeLeft(new NotFoundError("User not found"));
      }

      const { id, name, email, password, createdAt, updatedAt, deletedAt } = queryResult;

      return makeRight({ id, name, email, password, createdAt, updatedAt, deletedAt });
    } catch (error) {
      return makeLeft(new InternalError((error as Error).message));
    }
  }
}
