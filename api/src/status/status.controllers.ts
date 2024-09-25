import express, { Response, Request } from "express";
import status from "../../data/status.json";
import type { Status } from "./status.type";

const StatusControllers = express.Router();

// Get all statuses
StatusControllers.get('/', (_, res: Response) => {
    res.status(200).json(status);
});

// Get a specific status by ID
StatusControllers.get('/:id', (req: Request, res: Response) => {
    const statusId = parseInt(req.params.id, 10);  // Convert id to number
    const statuses = status.find(stat => stat.id === statusId) as Status;

    if (statuses) {
        res.status(200).json(statuses);
    } else {
        res.sendStatus(404);  // Send 404 if the status is not found
    }
});

export default StatusControllers;