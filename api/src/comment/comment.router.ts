import { getAllComments, createComment } from "./comment.controller";

const express = require("express");

const commentRouter = express.Router();

commentRouter.get("/", getAllComments);

commentRouter.post("/", createComment);

export default commentRouter;
