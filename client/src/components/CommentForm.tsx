import { useState } from "react";
import { useCreateNewCommentMutation } from "../generated/graphql-types"; // Import the generated mutation

const CommentForm = ({
  repoId,
  refetch,
}: {
  repoId: string;
  refetch: () => Promise<unknown>;
}) => {
  // Use the generated mutation hook
  const [createComment, { error }] = useCreateNewCommentMutation();

  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!author.trim() || !text.trim()) {
      setErrorMessage("Both name and comment text are required.");
      return;
    }

    try {
      // Clear any previous error messages
      setErrorMessage(null);

      // Execute the mutation
      await createComment({
        variables: {
          data: {
            author,
            text,
            repoId,
          },
        },
      });

      // After successful mutation, reset the form
      setAuthor("");
      setText("");

      // Refetch the comments after posting
      await refetch();
    } catch {
      setErrorMessage("Failed to post the comment. Please try again.");
    }
  };

  return (
    <div className="post-comment-section mt-8">
      <h2 className="mb-4 text-2xl font-semibold">Post a Comment</h2>

      {/* Display error message */}
      {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input for the author's name */}
        <div>
          <label className="mb-2 block text-lg font-medium" htmlFor="author">
            Your Name:
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full rounded-md border p-2 shadow-sm focus:border-blue-500 focus:outline-none"
            placeholder="Enter your name"
          />
        </div>

        {/* Text area for the comment */}
        <div>
          <label className="mb-2 block text-lg font-medium" htmlFor="text">
            Your Comment:
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-md border p-2 shadow-sm focus:border-blue-500 focus:outline-none"
            placeholder="Write your comment here..."
            rows={4}
          ></textarea>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Post Comment
        </button>
      </form>

      {/* Error message from the GraphQL mutation */}
      {error && (
        <div className="mt-4 text-red-600">
          {error.message || "Something went wrong while posting the comment."}
        </div>
      )}
    </div>
  );
};

export default CommentForm;
