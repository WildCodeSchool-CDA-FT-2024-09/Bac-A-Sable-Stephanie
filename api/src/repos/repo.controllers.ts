import { Response, Request } from "express";
// import repos from "../../data/repos.json";
// import type { Repo } from "./repo.type";
import RepoEntity from "./repo.entity";
// import { validate } from "class-validator";
import Status from "../status/status.entity";
// Function to get all repos or query on isPrivate
export const getAllRepos = async (_req: Request, res: Response) => {
  //   const { status } = req.query;
  //   const result =
  //     status !== undefined
  //       ? repos.filter((repo: Repo) => repo.isPrivate === +status)
  //       : repos;
  //   res.status(200).json(result);

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
  //   const repo = repos.find((rep) => rep.id === req.params.id) as Repo;
  //   if (repo) {
  //     res.status(200).json(repo);
  //   } else {
  //     res.sendStatus(404);
  //   }
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
  // repos.push(req.body);
  // res.status(201).json(req.body);
  try {
    const repo = new RepoEntity();
    repo.id = req.body.id;
    repo.name = req.body.name;
    repo.url = req.body.url;

    const status = await Status.findOneOrFail({
      where: { id: req.body.isPrivate },
    });
    repo.status = status;

    await repo.save();
    res.status(201).json(repo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }

  // Function to update the whole repo
  // export const updateRepo = async (req: Request, res: Response) => {
  //   try {
  //     const repo = await RepoEntity.findOneBy({ id: req.params.id });
  //     if (repo) {
  //       // Update the repo properties
  //       repo.name = req.body.name !== undefined ? req.body.name : repo.name;
  //       repo.url = req.body.url !== undefined ? req.body.url : repo.url;
  //       repo.isPrivate =
  //         req.body.isPrivate !== undefined ? req.body.isPrivate : repo.isPrivate;

  //       const errors = await validate(repo);
  //       if (errors.length > 0) {
  //         res.status(422).json(errors);
  //       } else {
  //         await repo.save();
  //         res.status(200).json(repo);
  //       }
  //     } else {
  //       res.sendStatus(404); // Repo not found
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // };
  // Function to update repo with isPrivate and name
  // export const modifyRepo = (req: Request, res: Response) => {
  //     const { id } = req.params;
  //     const { name, isPrivate } = req.body;

  //     // Find the repo by id
  //     const repo = repos.find((rep: Repo) => rep.id === id);

  //     if (repo) {
  //         // Validate and update the 'isPrivate' field (1 or 2)
  //         if (isPrivate !== undefined) {
  //             if (isPrivate === 1 || isPrivate === 2) {
  //                 repo.isPrivate = isPrivate; // Update the isPrivate field
  //             } else {
  //                 return res.status(400).json({ message: "'isPrivate' must be 1 or 2" });
  //             }
  //         }

  //         // Validate and update the 'name' field
  //         if (name && typeof name === "string") {
  //             repo.name = name; // Update the name field

  //             // Update the 'url' based on the new name
  //             repo.url = `https://github.com/brewost/${name}`;
  //         }

  //         // Respond with the updated repo object
  //         res.status(200).json(repo);
  //     } else {
  //         res.sendStatus(404); // Repo not found
  //     }
  // };

  // export const deleteRepoById = async (req: Request, res: Response) => {
  //   // const { id } = req.params;

  //   // const index = repos.findIndex((rep: Repo) => rep.id === id);

  //   // if (index !== -1) {
  //   //   repos.splice(index, 1); // Remove the repo directly from the array
  //   //   res.sendStatus(204); // No Content
  //   // } else {
  //   //   res.sendStatus(404); // Not found
  //   // }

  //   try {
  //     const repoRepository = RepoEntity;

  //     // Directly use the `delete` method, passing the ID
  //     const deleteResult = await repoRepository.delete(req.body.id);

  //     if (deleteResult.affected === 1) {
  //       // If a record was deleted (affected > 0), return 204 No Content
  //       res.sendStatus(204);
  //     } else {
  //       // If no record was found (affected === 0), return 404 Not Found
  //       res.sendStatus(404);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // };
};
