import { useEffect, useState } from "react";
import connection from "../services/connection";
import type { Language } from "../types/repotype";
// import RepoList from "./RepoList"; // Import the RepoList component
import { Link } from "react-router-dom";

const LanguageFilter = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  // const [repos, setRepos] = useState<Repo[]>([]); // State for storing filtered repositories
  // const [originalRepos, setOriginalRepos] = useState<Repo[]>([]); // State for original repositories

  // Fetch languages from API
  const fetchLanguages = async () => {
    try {
      const response = await connection.get<Language[]>("api/langs");
      const langdata = response.data;
      // const uniqueLanguages = [...new Set(langdata.map((lang) => lang.label))];
      setLanguages(langdata);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  // // Fetch all repositories on mount
  // const fetchAllRepositories = async () => {
  //   try {
  //     const response = await connection.get<Repo[]>("api/repos");
  //     setOriginalRepos(response.data); // Save the original repos
  //     setRepos(response.data); // Initialize repos to all
  //   } catch (error) {
  //     console.error("Error fetching repositories:", error);
  //   }
  // };

  // Fetch repositories filtered by language
  // const fetchRepositoriesByLanguage = async (language: string) => {
  //   try {
  //     const response = await connection.get<Repo[]>(
  //       `api/repos?language=${language}`,
  //     );
  //     setRepos(response.data); // Update state with the fetched repositories
  //   } catch (error) {
  //     console.error("Error fetching repositories:", error);
  //   }
  // };

  // const resetFilter = () => {
  //   setRepos(originalRepos); // Reset to original repositories
  // };

  useEffect(() => {
    fetchLanguages(); // Fetch languages on component mount
    // fetchAllRepositories(); // Fetch all repositories on mount
  }, []);

  return (
    <div>
      <div className="sticky top-[96px] z-10 flex w-full flex-row justify-center gap-2 bg-slate-500 pb-4">
        {languages.map((language) => (
          <Link
            key={language.id}
            to={`/repos/${language.label}`}
            className="rounded bg-teal-200 p-4 px-4 py-2 font-bold text-black shadow-md transition duration-300 ease-in-out hover:bg-blue-600"
          >
            {language.label}
          </Link>
        ))}
        <Link
          to="/"
          className="rounded bg-red-200 p-4 px-4 py-2 font-bold text-black shadow-md transition duration-300 ease-in-out hover:bg-red-600"
        >
          No Filter
        </Link>
      </div>
      {/* <RepoList repos={repos} />{" "} */}
    </div>
  );
};

export default LanguageFilter;
