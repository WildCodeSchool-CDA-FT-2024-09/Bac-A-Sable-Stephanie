import express, { Response, Request } from "express";
import status from "../../data/status.json";
import Status from "./status.entity";

const statusControllers = express.Router();

// Get all statuses
statusControllers.get("/", async (_, res: Response) => {
  try {
    const status = await Status.find({
      relations: {
        repos: true,
      },
    });
    res.status(200).json(status);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Get a specific status by ID
statusControllers.get("/:id", async (req: Request, res: Response) => {
  const statusId = parseInt(req.params.id, 10); // Convert id to number
  const statuses = status.find((stat) => stat.id === statusId) as Status;

  if (statuses) {
    res.status(200).json(statuses);
  } else {
    res.sendStatus(404); // Send 404 if the status is not found
  }
});

statusControllers.post("/", async (req: Request, res: Response) => {
  try {
    const status = new Status();
    status.label = req.body.label;

    await status.save();
    res.status(201).json(status);
  } catch (error) {
    res.sendStatus(500);
  }
});

export default statusControllers;
