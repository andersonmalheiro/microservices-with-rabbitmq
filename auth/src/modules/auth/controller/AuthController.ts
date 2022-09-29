import { Request, Response } from "express";
import AuthService from "../service/AuthService";

class UserController {
  async getAccessToken(req: Request, res: Response) {
    return AuthService.getAccessToken(req, res);
  }
}

export default new UserController();