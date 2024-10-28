import { Response, Request } from "express";
// import langs from "../../data/langs.json";
// import type { Lang } from "./lang.type"
import Lang from "../langs/lang.entity";

// Function to get all languages
export const getAllLangs = async (_: Request, res: Response) => {
  try {
    const langs = await Lang.find({
      relations: {
        repos: true,
      },
    });

    res.status(200).json(langs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get a language by ID
// export const getLangById = (req: Request, res: Response) => {
//   const langId = parseInt(req.params.id, 10);
//   const lang = langs.find((lang: Lang) => lang.id === langId);

//   if (lang) {
//     res.status(200).json(lang);
//   } else {
//     res.sendStatus(404);
//   }
// };
export const createLang = async (req: Request, res: Response) => {
  try {
    const lang = new Lang();
    lang.label = req.body.label;

    await lang.save();
    res.status(201).json(lang);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
