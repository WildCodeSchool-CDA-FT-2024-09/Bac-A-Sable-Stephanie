import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Detail from "../components/Detail";
import CommentDetail from "../components/CommentDetail";
import CommentForm from "../components/CommentForm";
import { Repo } from "../types/repotype";

function ReposDetail() {
  const repo = useLoaderData() as Repo;
  const [comments, setComments] = useState(repo.comments);
  return (
    <main>
      <Detail repo={repo} />
      <CommentDetail comments={comments} />
      <CommentForm repoId={repo.id} setComments={setComments} />
    </main>
  );
}

export default ReposDetail;
