//import { useLoaderData } from "react-router-dom";
//import { useState } from "react";
import { useParams } from "react-router-dom";
import Detail from "../components/Detail";
import CommentDetail from "../components/CommentDetail";
//import CommentForm from "../components/CommentForm";
//import { Repo } from "../types/repotype";
import { useQuery, gql } from "@apollo/client";

const GET_REPO_DETAILS = gql`
  query Repobyid($repobyidId: String!) {
    repobyid(id: $repobyidId) {
      id
      languages {
        label
      }
      name
      url
      status {
        label
      }
      comments {
        author
        text
      }
    }
  }
`;

function ReposDetail() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPO_DETAILS, {
    variables: { repobyidId: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading repositories.</p>;
  //const repo = useLoaderData() as Repo;
  // const [comments, setComments] = useState(repo.comments);
  return (
    <main>
      <Detail repo={data.repobyid} />
      <CommentDetail comments={data.repobyid.comments} />
      {/* <CommentForm repoId={repo.id} setComments={setComments} /> */}
    </main>
  );
}

export default ReposDetail;
