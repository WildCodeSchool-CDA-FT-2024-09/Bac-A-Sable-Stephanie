import { Repo } from "../generated/graphql-types"; // Import the Repo type

const Detail = ({ repo }: { repo: Repo }) => {
  return (
    <div className="detail-page">
      <h1 className="mb-4 text-3xl font-bold">Repository Details:</h1>

      <div className="repo-info rounded-lg border bg-white p-4 shadow-md">
        <h2 className="mb-2 text-2xl font-semibold">{repo.name}</h2>

        <p className="mb-2 text-lg font-semibold">
          Status: {repo.status.label}
        </p>

        <ul className="mb-2 flex gap-3 text-sm font-semibold">
          {repo.languages.length > 0 ? (
            repo.languages.map((lang) => <li key={lang.id}>{lang.label}</li>)
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
      </div>
    </div>
  );
};

export default Detail;
