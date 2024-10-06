import {
  getAllRepos,
  getRepoById,
  createRepo,
  getReposByLanguage,
} from "./repo.controllers";
// import { validateRepo } from "./repo.validate";
const express = require("express");

const repoRouter = express.Router();

repoRouter.get("/", getAllRepos);
repoRouter.get("/:id", getRepoById);
repoRouter.get("/languages/:language", getReposByLanguage);
repoRouter.post("/", createRepo);
// repoRouter.put("/:id", updateRepo);
// repoRouter.patch ('',validateModifyRepo, modifyRepo )
// repoRouter.delete("/:id", deleteRepoById);

export default repoRouter;
