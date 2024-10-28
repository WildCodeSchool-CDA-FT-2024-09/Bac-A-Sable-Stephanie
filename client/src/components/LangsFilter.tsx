import { useEffect, useState } from "react";
import connection from "../services/connection";
import type { Language } from "../types/repotype";
import { Link } from "react-router-dom";

const LanguageFilter = () => {
  const [languages, setLanguages] = useState<Language[]>([]);

  // Fetch languages from API
  const fetchLanguages = async () => {
    try {
      const response = await connection.get<Language[]>("api/langs");
      const langdata = response.data;
      setLanguages(langdata);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  useEffect(() => {
    fetchLanguages(); // Fetch languages on component mount
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
    </div>
  );
};

export default LanguageFilter;
