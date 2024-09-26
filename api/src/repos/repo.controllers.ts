import { Response, Request } from "express";

import repos from "../../data/repos.json"
import type { Repo } from "./repo.type"

// Function to get all repos
export const getAllRepos = (_: Request, res: Response) => {
    res.status(200).json(repos);
};

// Function to get a repo by id
export const getRepoById = (req: Request, res: Response) => {
    const repo = repos.find((rep) => rep.id === req.params.id) as Repo;
    if (repo) {
        res.status(200).json(repo);
    } else {
        res.sendStatus(404);
    }
};

// Function to create a new repo
export const createRepo = (req: Request, res: Response) => {
    repos.push(req.body);
    res.status(201).json(req.body);
};

