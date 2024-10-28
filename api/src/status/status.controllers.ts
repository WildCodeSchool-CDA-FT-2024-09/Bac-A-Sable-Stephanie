import { Response, Request } from "express";

import Status from "./status.entity";

// Function to get all languages
export const getAllStatus = async (_: Request, res: Response) => {
  try {
    const status = await Status.find({
      relations: {
        repos: true,
      },
    });

    res.status(200).json(status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createStatus = async (req: Request, res: Response) => {
  try {
    const status = new Status();
    status.label = req.body.label;

    await status.save();
    res.status(201).json(status);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
