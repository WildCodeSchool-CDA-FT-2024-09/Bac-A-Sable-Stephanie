// import React, { useEffect, useState } from 'react';
// import RepoCard from './RepoCard';
// import Loader from './Loader';
// import ErrorMessage from './ErrorMessage';
// import type { Repo } from "../types/repotype";

// const RepoList: React.FC = () => {
//   const [repos, setRepos] = useState<Repo[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchRepos = async () => {
//       try {
//         const response = await fetch(`${vite-env._REACT_APP_BACKEND_URL}/api/repos`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data: Repo[] = await response.json();
//         setRepos(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An unknown error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRepos();
//   }, []);

//   if (loading) return <Loader />;
//   if (error) return <ErrorMessage message={error} />;

//   return (
//     <div className="repo-list">
//       {repos.map((repo) => (
//         <RepoCard key={repo.id} {...repo} />
//       ))}
//     </div>
//   );
// };

// export default RepoList;
