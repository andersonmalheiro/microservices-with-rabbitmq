import { makeLeft, makeRight } from "utils/functions/either";
import { Either } from "utils/models/Either";
import UserModel, { UserData } from "../model/User";

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
  ): Promise<Either<null | undefined, UserData>> {
    const result = await UserModel.findOne({
      where: { email: userEmail },
    });

    if (!result) {
      return makeLeft(null);
    }

    const { id, name, email, createdAt, updatedAt, deletedAt } = result;

    return makeRight({ id, name, email, createdAt, updatedAt, deletedAt });
  }
}
