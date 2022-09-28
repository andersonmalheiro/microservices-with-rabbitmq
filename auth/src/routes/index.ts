import { Router } from "express";
import checkTokenMiddleware from 'middleware/CheckToken';
import UserRoutes from '../modules/user/routes/UserRoutes';

const mainRouter = Router();

mainRouter.use(UserRoutes);

mainRouter.use(checkTokenMiddleware);

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