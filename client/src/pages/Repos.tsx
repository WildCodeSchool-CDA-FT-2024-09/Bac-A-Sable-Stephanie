//import { useLoaderData } from "react-router-dom";
import RepoList from "../components/RepoList";
import LanguageFilter from "../components/LangsFilter";
import { Language, Repo } from "../types/repotype";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_REPOS = gql`
  query Query($langlabel: String) {
    fullrepos(langlabel: $langlabel) {
      id
      name
      status {
        label
      }
      url
      languages {
        label
      }
    }
    alllangs {
      label
      id
    }
  }
`;

function Repos() {
  const params = useParams();
  const language = params.language;
  const vars = language ? { langlabel: language } : {};
  const { data, loading, error } = useQuery(GET_REPOS, {
    variables: vars,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading repositories.</p>;

  const repos: Repo[] = data.fullrepos;
  const languages: Language[] = data.alllangs;

  return (
    <main>
      <LanguageFilter languages={languages} />
      <RepoList repos={repos} />
    </main>
  );
}

export default Repos;
