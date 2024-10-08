import { Comment } from "./comment.entity";
import { Query, Resolver } from "type-graphql";

// @InputType()
// class CommentInput implements Partial<Comment> {
//   @Field()
//   author: string;

//   @Field()
//    text: string;
// }

@Resolver(Comment)
export default class CommentResolver {
  // Methode GET pour tous les repos
  @Query(() => [Comment])
  async fullrepos() {
    const repos = await Comment.find({
      relations: {
        repo: true,
      },
    });
    console.info(repos);
    return repos;
  }
}

//   @Mutation(() => Comment)
//   async createNewComment(
//     @Arg("data") newCommentData: CommentInput,
//     @Arg("repoId") repoId: string // Assuming the comment belongs to a Repo
//   ) {
//     try {
//       // Find the associated repo
//       const repo = await Repo.findOneBy({ id: repoId });
//       if (!repo) {
//         throw new Error("Repo not found");
//       }

//       // Create a new comment instance
//       const comment = Comment.create({
//         author: newCommentData.author,
//         text: newCommentData.text,
//         repo, // Set the relationship
//       });

//       // Save the new comment to the database
//       await comment.save();

//       console.info(comment);
//       return comment;
//     } catch (error) {
//       console.error("Error creating comment:", error);
//       throw new Error("Failed to create comment");
//     }
