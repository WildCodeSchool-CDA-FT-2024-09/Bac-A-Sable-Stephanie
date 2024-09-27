import { getAllLangs, getLangById} from "./lang.controllers"

const express = require("express");

const langRouter = express.Router();

langRouter.get('/', getAllLangs);
langRouter.get('/:id', getLangById);

export default langRouter;