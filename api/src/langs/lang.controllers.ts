import express, { Response, Request} from "express";
import langs from "../../data/langs.json"
import type { Lang } from "./lang.type"

const langControllers = express.Router();
langControllers.get('/', (_, res: Response) => {
    res.status(200).json(langs)
    
}) 

langControllers.get('/:id', (req: Request, res: Response) => {
    const langId = parseInt(req.params.id, 10);
    const lang = langs.find((lang: Lang) => lang.id === langId);

    if (lang) {
        res.status(200).json(lang); 
    } else {
        res.sendStatus(404); 
    }
});
export default langControllers;