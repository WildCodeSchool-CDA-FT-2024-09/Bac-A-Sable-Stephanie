import express from "express";
import { Response, Request } from "express";
import repoRouter from "./repos/repo.router";
import langRouter from "./langs/lang.router";

import statusRouter from "./status/status.router";

const router = express.Router();

router.get("/", (_: Request, res: Response) => {
  res.send("Woot!");
});
router.use("/repos", repoRouter);
router.use("/langs", langRouter);
router.use("/status", statusRouter);

export default router;
