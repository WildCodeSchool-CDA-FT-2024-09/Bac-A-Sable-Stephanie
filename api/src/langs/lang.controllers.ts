import { Response, Request } from "express";
import { Lang } from "../langs/lang.entity";

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
