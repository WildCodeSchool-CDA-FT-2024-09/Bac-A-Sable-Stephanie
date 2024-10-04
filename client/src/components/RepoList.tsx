import RepoCard from "./RepoCard";
import { Repo } from "../types/repotype";

function RepoList({ repos }: { repos: Repo[] }) {
  return (
    <div>
      {repos.length ? (
        <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo: Repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">LOADING...</p>
      )}
    </div>
  );
}

export default RepoList;
