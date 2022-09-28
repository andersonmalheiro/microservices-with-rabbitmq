import { Request, Response } from "express";
import UserService from "../service/UserService";

class UserController {
  async findByEmail(req: Request, res: Response) {
    return UserService.findByEmail(req, res);
  }

  async getAccessToken(req: Request, res: Response) {
    return UserService.getAccessToken(req, res);
  }
}

export default new UserController();