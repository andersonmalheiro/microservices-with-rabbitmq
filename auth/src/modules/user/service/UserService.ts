import statusCodes from "@config/constants/statusCodes";
import { Request } from "express";
import UserRepository from "../repository/UserRepository";

class UserService {
  constructor(private repository: UserRepository) {}

  public async findByEmail(request: Request) {
    try {
      const { email } = request.params;

      if (!email) {
        throw new Error("Email not provided.");
      }

      const user = await this.repository.findByEmail(email);

      if (!user) {

      }

      return {}
    } catch (err) {
      return {
        status: (err as any).status
          ? (err as any).status
          : statusCodes.INTERNAL_ERROR,
        message: (err as any).message,
      };
    }
  }
}

export default new UserService(new UserRepository());
