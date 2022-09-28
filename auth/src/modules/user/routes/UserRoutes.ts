import UserController from '@modules/user/controller/UserController';
import { Router } from "express";

const userRouter = Router();

userRouter.get("/api/user/findByEmail", UserController.findByEmail);
userRouter.post("/api/user/auth", UserController.getAccessToken);

export default userRouter;