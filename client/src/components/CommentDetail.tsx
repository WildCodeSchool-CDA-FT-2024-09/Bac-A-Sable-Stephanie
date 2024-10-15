import { Comment } from "../generated/graphql-types";

const CommentDetail = ({ comments }: { comments: Comment[] }) => {
  return (
    <div className="comments-section mt-8">
      <h2 className="mb-4 text-2xl font-semibold">Comments:</h2>

      {comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comment, index) => (
            <li
              key={index}
              className="comment rounded-lg border bg-gray-100 p-4 shadow-sm"
            >
              <p className="mb-2 text-lg font-semibold">{comment.author}</p>
              <p className="text-base">{comment.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="comment rounded-lg border bg-gray-100 p-4 shadow-sm">
          <p className="text-gray-500">Got something to say?</p>
        </div>
      )}
    </div>
  );
};

export default CommentDetail;
