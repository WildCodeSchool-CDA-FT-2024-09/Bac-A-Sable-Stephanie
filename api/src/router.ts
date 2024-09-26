import express from 'express';
import { Response, Request} from 'express';
import repoRouter from"./repos/repo.router"

import langControllers from "./langs/lang.controllers"
import statusControllers from "./status/status.controllers"

const router = express.Router();

 router.get("/", (_: Request, res: Response) => {
     res.send ("Woot!")
 })
router.use('/repos' , repoRouter);
router.use('/langs', langControllers);
router.use('/status', statusControllers)

 export default router;