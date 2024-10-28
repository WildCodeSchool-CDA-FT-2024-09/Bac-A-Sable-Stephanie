import { Comment } from "./comment.entity";
import { Repo } from "../repos/repo.entity";
import { Arg, Mutation, Query, Resolver, InputType, Field } from "type-graphql";

// Define CommentInput as a GraphQL InputType
@InputType()
class CommentInput implements Partial<Comment> {
  @Field()
  author: string;

  @Field()
  text: string;

  @Field()
  repoId: string;
}

// Resolver for Comment
@Resolver(Comment)
export default class CommentResolver {
  // Query to fetch all repos with their related comments
  @Query(() => [Comment])
  async fullcomments() {
    const repos = await Comment.find({
      relations: {
        repo: true,
      },
    });
    console.info(repos);
    return repos;
  }

  // Mutation to create a new comment and associate it with a repository
  @Mutation(() => Comment)
  async createNewComment(
    @Arg("data") newCommentData: CommentInput
  ): Promise<Comment> {
    try {
      // Find the associated repository using the provided repoId
      const repo = await Repo.findOneOrFail({
        where: { id: newCommentData.repoId },
      });
      if (!repo) {
        throw new Error("Repo not found");
      }

      // Create a new comment instance and associate it with the repo
      const comment = Comment.create({
        author: newCommentData.author,
        text: newCommentData.text,
        repo: repo, // Set the relationship to the found repo
      });

      // Save the new comment to the database
      await comment.save();

      console.info(comment);
      return comment;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw new Error("Failed to create comment");
    }
  }
}
