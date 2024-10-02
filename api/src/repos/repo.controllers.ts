import { Response, Request } from "express";
import RepoEntity from "./repo.entity";

export const getAllRepos = async (_req: Request, res: Response) => {
  try {
    const repos = await RepoEntity.find({
      relations: {
        status: true,
        languages: true,
      },
    });

    res.status(200).json(repos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get a repo by id
export const getRepoById = async (req: Request, res: Response) => {
  try {
    const repo = await RepoEntity.findOneBy({ id: req.params.id });
    if (repo) {
      res.status(200).json(repo);
    } else {
      res.sendStatus(404); // Repo not found
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Function to create a new repo
export const createRepo = async (req: Request, res: Response) => {
  try {
    const repo = new RepoEntity();
    repo.id = req.body.id;
    repo.name = req.body.name;
    repo.url = req.body.url;
    repo.status = req.body.status;
    repo.languages = req.body.languages;

    await repo.save();
    res.status(201).json(repo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
