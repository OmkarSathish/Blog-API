import "dotenv/config";
import chalk from "chalk";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

import apiRouter from "./routes/index.js";
import connectDB from "./models/dbConfig.js";

connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", apiRouter);

app.listen(port, () => {
  const api = `Serving on: ${chalk.cyanBright(
    `http://localhost:${port}/api/v1`
  )}`;
  console.log(api);
});
