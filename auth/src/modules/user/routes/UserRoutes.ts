import UserController from '@modules/user/controller/UserController';
import { Router } from "express";

const userRouter = Router();

userRouter.get("/api/user/findByEmail", UserController.findByEmail);

export default userRouter;