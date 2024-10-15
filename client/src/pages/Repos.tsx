//import { useLoaderData } from "react-router-dom";
import RepoList from "../components/RepoList";
import LanguageFilter from "../components/LangsFilter";
import { Language, Repo } from "../types/repotype";
//import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useRepobylangQuery } from "../generated/graphql-types";

function Repos() {
  const params = useParams();
  const language = params.language || "";
  const vars = { langlabel: language };
  const { data, loading, error } = useRepobylangQuery({
    variables: vars,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading repositories.</p>;

  const repos: Repo[] = data?.fullrepos || [];
  const languages: Language[] = data?.alllangs || [];

  return (
    <main>
      <LanguageFilter languages={languages} />
      <RepoList repos={repos} />
    </main>
  );
}

export default Repos;
