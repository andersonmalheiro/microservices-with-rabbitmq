import AuthRouter from "@modules/auth/router/AuthRouter";
import UserRouter from "@modules/user/router/UserRouter";
import { Router } from "express";
import AuthorizationMiddleware from "@middleware/AuthorizationMiddleware";

const mainRouter = Router();

mainRouter.use("/api/auth", AuthRouter);
mainRouter.use("/api/user", AuthorizationMiddleware, UserRouter);

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

export default mainRouter;
