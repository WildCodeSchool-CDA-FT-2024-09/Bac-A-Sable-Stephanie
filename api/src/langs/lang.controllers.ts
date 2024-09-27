import { Response, Request} from "express";
import langs from "../../data/langs.json"
import type { Lang } from "./lang.type"

// Function to get all languages
export const getAllLangs = (_: Request, res: Response) => {
    res.status(200).json(langs);
};

// Function to get a language by ID
export const getLangById = (req: Request, res: Response) => {
    const langId = parseInt(req.params.id, 10);
    const lang = langs.find((lang: Lang) => lang.id === langId);

    if (lang) {
        res.status(200).json(lang);
    } else {
        res.sendStatus(404);
    }
};

