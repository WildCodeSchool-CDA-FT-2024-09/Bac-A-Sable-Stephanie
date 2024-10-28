import { Repo } from "../types/repotype";
import { Link } from "react-router-dom"; // Import the Link component

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <Link
      to={`/detail/${repo.id}`}
      className="mb-4 w-full max-w-md transform cursor-pointer rounded-lg bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
    >
      <p className="mb-2 text-2xl font-semibold">{repo.name}</p>
      <p className="mb-2 text-lg font-semibold">Status: {repo.status.label}</p>

      <ul className="mb-2 flex gap-3 text-sm font-semibold">
        {repo.languages.length > 0 ? (
          repo.languages.map((lang) => <li key={lang.id}>{lang.label}</li>)
        ) : (
          <li className="text-gray-500">Nothing to see here, move along</li>
        )}
      </ul>
    </Link>
  );
}

export default RepoCard;
