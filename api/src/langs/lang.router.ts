import { getAllLangs, createLang } from "./lang.controllers";

const express = require("express");

const langRouter = express.Router();

langRouter.get("/", getAllLangs);
langRouter.post("/", createLang);
export default langRouter;
