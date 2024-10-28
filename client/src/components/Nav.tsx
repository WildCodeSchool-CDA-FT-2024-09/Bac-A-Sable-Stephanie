import { Link } from "react-router-dom"; // Import the Link component

function Navbar() {
  return (
    <header className="sticky top-0 z-10 flex w-full flex-col items-center bg-slate-500 p-4">
      <div className="flex w-full justify-between">
        <h1 className="flex-grow text-center text-6xl text-white">
          All my Repos, so many repos
        </h1>
        <Link to="/" className="cursor-pointer">
          <img
            src="src/assets/home_icon.png"
            alt="home icon"
            className="h-16 w-16"
          />
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
