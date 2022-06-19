import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import routes from "./routes";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(routes);

export default app;
