import express from 'express';
import { Response, Request} from 'express';
import repoControllers from "./repos/repo.controllers"
import langControllers from "./langs/lang.controllers"
import statusControllers from "./status/status.controllers"

 const router = express.Router();

 router.get("/", (_: Request, res: Response) => {
     res.send ("Woot!")
 })
router.use('/repos', repoControllers);
router.use('/langs', langControllers);
router.use('/status', statusControllers)

 export default router;