import { useLoaderData } from "react-router-dom";
import RepoList from "../components/RepoList";
import { Repo } from "../types/repotype";

function Repos() {
  const repos = useLoaderData() as Repo[];

  return <RepoList repos={repos} />;
}

export default Repos;
