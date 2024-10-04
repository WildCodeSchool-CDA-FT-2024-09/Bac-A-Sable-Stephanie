import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-800">
          Oops! Page not found.
        </p>
        <p className="mt-2 text-gray-600">
          This is not the page you are looking for. My bad. We all make
          mistakes. I forgive me.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}

export default ErrorPage;
