import { useState } from "react";
import { DocumentNode, gql, useMutation } from "@apollo/client";

const CREATE_NEW_COMMENT = gql`
  mutation CreateNewComment($data: CommentInput!) {
    createNewComment(data: $data) {
      author
      text
    }
  }
`;
const CommentForm = ({
  repoId,
  refetchQuery,
}: {
  repoId: string;
  refetchQuery: DocumentNode;
}) => {
  const [createComment] = useMutation(CREATE_NEW_COMMENT);

  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const variables = {
    data: {
      author,
      text,
      repoId,
    },
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form behavior
    await createComment({
      variables: variables,
      refetchQueries: [
        { query: refetchQuery, variables: { repobyidId: repoId } },
      ],
    }); // Call the postComment function
  };

  return (
    <div className="post-comment-section mt-8">
      <h2 className="mb-4 text-2xl font-semibold">Post a Comment</h2>

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
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
