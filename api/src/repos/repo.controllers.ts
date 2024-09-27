import { Response, Request } from "express";

import repos from "../../data/repos.json"
import type { Repo } from "./repo.type"

// Function to get all repos or query on isPrivate
export const getAllRepos = (req: Request, res: Response) => {
    const { status } = req.query; 

    const result = status !== undefined 
        ? repos.filter((repo: Repo) => repo.isPrivate === +status) 
        : repos; 

    res.status(200).json(result); 
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
// Function to update the whole repo
export const updateRepo = (req: Request, res: Response) => {
    const { id } = req.params;
    const repoIndex = repos.findIndex((rep: Repo) => rep.id === id);

    if (repoIndex !== -1) {
        const existingRepo = repos[repoIndex]
        if (req.body.name !== undefined) {
            existingRepo.name = req.body.name;
        }
        if (req.body.url !== undefined) {
            existingRepo.url = req.body.url;
        }
        if (req.body.isPrivate !== undefined) {
            existingRepo.isPrivate = req.body.isPrivate;
        }

        // Respond with the updated repo
        res.status(200).json(existingRepo); 
    } else {
        res.sendStatus(404); // Repo not found
    }
};
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



export const deleteRepoById = (req: Request, res: Response) => {
    const { id } = req.params; 

    const index = repos.findIndex((rep: Repo) => rep.id === id); 

    if (index !== -1) { 
        repos.splice(index, 1); // Remove the repo directly from the array
        res.sendStatus(204); // No Content
    } else {
        res.sendStatus(404); // Not found
    }
};
