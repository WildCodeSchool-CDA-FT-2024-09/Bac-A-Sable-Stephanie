import "./index.css";

import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="container mx-auto flex min-h-[95vh] flex-col items-center justify-between bg-slate-500">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
