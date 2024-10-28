import { getAllStatus, createStatus } from "./status.controllers";

const express = require("express");

const statusRouter = express.Router();

statusRouter.get("/", getAllStatus);

statusRouter.post("/", createStatus);
export default statusRouter;
