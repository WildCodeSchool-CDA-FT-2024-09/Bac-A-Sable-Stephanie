import { useParams } from "react-router-dom";
import Detail from "../components/Detail";
import CommentDetail from "../components/CommentDetail";
import CommentForm from "../components/CommentForm";
//import { useQuery } from "@apollo/client";
import { Repo, useRepobyidQuery } from "../generated/graphql-types";

function ReposDetail() {
  const { id } = useParams();
  const { data, loading, error, refetch } = useRepobyidQuery({
    variables: { repobyidId: id as string },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading repositories.</p>;
  if (!data) return <p>No data</p>;
  const { repobyid } = data as { repobyid: Repo };
  return (
    <main>
      <Detail repo={repobyid} />
      <CommentDetail comments={repobyid.comments} />
      <CommentForm repoId={repobyid.id} refetch={refetch} />
    </main>
  );
}

export default ReposDetail;
