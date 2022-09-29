import UserController from "@modules/user/controller/UserController";
import { Router } from "express";

const UserRouter = Router();

UserRouter.get("/findByEmail", UserController.findByEmail);

export default UserRouter;
