import "./App.css";
import { useEffect, useState } from "react";
import connection from "./services/connection";
import type { Repo } from "./types/repotype";
// import data from "./assets/data.json";
import RepoCard from "./components/RepoCard";

function App() {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    console.log("I'm the useEffect");
    const fetchRepos = async () => {
      try {
        const repos = await connection.get<Repo[]>("/api/repos");
        setRepos(repos.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRepos();
  }, []);

  return (
    <main>
      {repos.length ? repos.map((repo: Repo) => (
        <RepoCard key={repo.id} name={repo.name} url={repo.url} id = {""}  />
      )): <p>LOADING</p>}
    </main>
  );
}

export default App;

