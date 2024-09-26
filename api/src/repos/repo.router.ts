import { getAllRepos, getRepoById, createRepo } from "./repo.controllers"
import validateRepo from "./repo.validate";
const express = require("express");

const repoRouter = express.Router();
 

repoRouter.get('/', getAllRepos);
repoRouter.get('/:id', getRepoById);
repoRouter.post('/', validateRepo, createRepo);

export default repoRouter;