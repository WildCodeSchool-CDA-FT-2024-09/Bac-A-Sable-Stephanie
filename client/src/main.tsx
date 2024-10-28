import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import RepoDetail from "./pages/RepoDetail.tsx";
import Error from "./pages/Error.tsx";
import Repos from "./pages/Repos.tsx";

import connection from "./services/connection.ts";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />, // Error page to handle any route errors
    children: [
      {
        path: "/",
        element: <Repos />,
        loader: async () => {
          const repos = await connection.get(`/api/repos/`);
          console.log("Loader", repos);
          return repos.data;
        },
      },
      {
        path: "/repos/:language",
        element: <Repos />,
        loader: async ({ params }) => {
          const repos = await connection.get(
            `/api/repos/languages/${params.language}`,
          );
          return repos.data;
        },
      },
      {
        path: "/detail/:id",
        element: <RepoDetail />,
        loader: async ({ params }) => {
          const repo = await connection.get(`/api/repos/${params.id}`);
          console.log("Loader", repo);
          return repo.data;
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
