import { useLoaderData } from "react-router-dom";
import RepoList from "../components/RepoList";
import LanguageFilter from "../components/LangsFilter";
import { Repo } from "../types/repotype";

function Repos() {
  const repos = useLoaderData() as Repo[];

  return (
    <main>
      <LanguageFilter />
      <RepoList repos={repos} />;
    </main>
  );
}

export default Repos;
