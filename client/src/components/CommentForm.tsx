import { useState } from "react";
import connection from "../services/connection";
import { Comment } from "../types/repotype";

const CommentForm = ({
  repoId,
  setComments,
}: {
  repoId: string;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}) => {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to post a comment
  const postComment = async () => {
    setIsSubmitting(true); // Start submitting

    const commentData = {
      author,
      text,
      repoId,
    };

    try {
      const response = await connection.post("/api/comment", commentData);
      if (response.status === 201) {
        setComments((prev) => [...prev, response.data]);
      }

      // Reset the form fields
      setAuthor("");
      setText("");
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false); // End submitting
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form behavior
    postComment(); // Call the postComment function
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
            disabled={isSubmitting} // Disable input while submitting
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
            disabled={isSubmitting} // Disable input while submitting
          ></textarea>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
