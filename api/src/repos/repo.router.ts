import { getAllRepos, getRepoById, createRepo,updateRepo, deleteRepoById } from "./repo.controllers"
import { validateRepo } from "./repo.validate";
const express = require("express");

const repoRouter = express.Router();
 

repoRouter.get('/', getAllRepos);
repoRouter.get('/:id', getRepoById);
repoRouter.post('/', validateRepo, createRepo);
repoRouter.put('/:id', validateRepo, updateRepo);
// repoRouter.patch ('',validateModifyRepo, modifyRepo )
repoRouter.delete('/:id', deleteRepoById);

export default repoRouter;