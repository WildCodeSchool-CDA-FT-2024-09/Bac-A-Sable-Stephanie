//import { useLoaderData } from "react-router-dom";
import RepoList from "../components/RepoList";
import LanguageFilter from "../components/LangsFilter";
import { Language, Repo } from "../types/repotype";
//import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  useRepobylangQuery,
  useLoginLazyQuery,
} from "../generated/graphql-types";

function Repos() {
  const params = useParams();
  const language = params.language || "";
  const vars = { langlabel: language };
  const { data, loading, error } = useRepobylangQuery({
    variables: vars,
  });
  const [login] = useLoginLazyQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading repositories.</p>;

  const repos: Repo[] = data?.fullrepos || [];
  const languages: Language[] = data?.alllangs || [];

  const handleLogin = async () => {
    await login({
      variables: {
        email: "test@test.com",
        password: "argon2hash",
      },
    });
  };
  return (
    <main>
      <LanguageFilter languages={languages} />
      <RepoList repos={repos} />
      <button
        className="rounded bg-teal-200 p-4 px-4 py-2 font-bold text-black shadow-md transition duration-300 ease-in-out hover:bg-blue-600"
        type="button"
        onClick={handleLogin}
      >
        LOGIN
      </button>
    </main>
  );
}

export default Repos;
