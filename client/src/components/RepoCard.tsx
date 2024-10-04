import { Repo } from "../types/repotype";
import { Link } from "react-router-dom"; // Import the Link component

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <Link
      to={`/detail/${repo.id}`} // Navigate to the detail page
      className="mb-4 w-full max-w-md transform cursor-pointer rounded-lg bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105" // Added hover scale and cursor pointer
    >
      {/* Wrap the entire card with Link to make it clickable */}
      <p className="mb-2 text-2xl font-semibold">{repo.name}</p>
      <p className="mb-2 text-lg font-semibold">Status: {repo.status.label}</p>

      <ul className="mb-2 flex gap-3 text-sm font-semibold">
        {repo.languages.length > 0 ? (
          repo.languages.map((lang, index) => <li key={index}>{lang.label}</li>)
        ) : (
          <li className="text-gray-500">Nothing to see here, move along</li>
        )}
      </ul>
      <a
        href={repo.url}
        target="_blank" // Opens link in a new tab
        rel="noopener noreferrer" // Security best practices
        className="text-blue-500 underline decoration-blue-500 hover:text-purple-500 hover:decoration-purple-500"
      >
        {repo.url}
      </a>
    </Link>
  );
}

export default RepoCard;
