import { useLoaderData } from "react-router-dom";
import { Repo } from "../types/repotype"; // Import the Repo type

const Detail = () => {
  // Get the loaded data from the loader, typed as Repo
  const repo = useLoaderData() as Repo;

  return (
    <main className="detail-page">
      <h1 className="mb-4 text-3xl font-bold">Repository Details</h1>

      <div className="repo-info rounded-lg border bg-white p-4 shadow-md">
        <h2 className="mb-2 text-2xl font-semibold">{repo.name}</h2>

        <p className="mb-2">
          <strong>URL:</strong>{" "}
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700"
          >
            {repo.url}
          </a>
        </p>

        <p className="mb-2">
          <strong>Status:</strong> {repo.status.label}
        </p>

        <p>
          <strong>Languages:</strong>{" "}
          {repo.languages.length > 0 ? (
            repo.languages.map((lang) => lang.label).join(", ")
          ) : (
            <span className="text-gray-500">
              Nothing to see here, move along
            </span>
          )}
        </p>
      </div>
    </main>
  );
};

export default Detail;
