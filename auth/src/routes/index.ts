import { Router } from "express";
import UserRoutes from '../modules/user/routes/UserRoutes';

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

mainRouter.use(UserRoutes);

export default mainRouter;