import { useParams } from "react-router-dom";
import Detail from "../components/Detail";
import CommentDetail from "../components/CommentDetail";
import CommentForm from "../components/CommentForm";
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

  return (
    <main>
      <Detail repo={data.repobyid} />
      <CommentDetail comments={data.repobyid.comments} />
      <CommentForm repoId={data.repobyid.id} refetchQuery={GET_REPO_DETAILS} />
    </main>
  );
}

export default ReposDetail;
