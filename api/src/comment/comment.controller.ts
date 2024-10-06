import { Response, Request } from "express";

import Comment from "./comment.entity";

// Function to get all languages
export const getAllComments = async (_: Request, res: Response) => {
  try {
    const comments = await Comment.find({
      relations: {
        repo: true,
      },
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const comment = new Comment();
    comment.author = req.body.author;
    comment.text = req.body.text;
    comment.repo = req.body.repoId;

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
