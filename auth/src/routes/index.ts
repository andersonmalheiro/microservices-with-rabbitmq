import { Router } from "express";
import UserRouter from './user';

const mainRouter = Router();

mainRouter.get("/api/status", (req, res) => {
  return res
    .status(200)
    .json({
      service: "auth-api",
      status: "up",
      httpStatus: 200,
    })
    .send();
});

mainRouter.use(UserRouter);

export default mainRouter;