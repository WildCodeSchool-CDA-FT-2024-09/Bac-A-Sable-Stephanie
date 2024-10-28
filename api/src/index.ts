import express from "express";
import router from "./router";
import * as dotenv from "dotenv";
import cors from "cors";
import "reflect-metadata";
import AppDataSource from "./data-source";

dotenv.config();
const { APP_PORT, CLIENT_URL } = process.env;

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
  })
);

app.use(express.json());
app.use("/api", router);

app.listen(APP_PORT, async () => {
  await AppDataSource.initialize();
  console.log(`Server is listening on http://localhost:${APP_PORT}`);
});
