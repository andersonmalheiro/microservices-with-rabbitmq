import UserService from '@modules/user/service/UserService';
import { Router } from "express";

const userRouter = Router();

userRouter.get("/api/user/findByEmail", UserService.findByEmail);

export default userRouter;