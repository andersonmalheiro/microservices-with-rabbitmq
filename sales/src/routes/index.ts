import { Router } from "express";

const mainRouter = Router();

mainRouter.get("/api/status", (req, res) => {
  return res
    .status(200)
    .json({
      service: "sales-api",
      status: "up",
      httpStatus: 200,
    })
    .send();
});

export default mainRouter;