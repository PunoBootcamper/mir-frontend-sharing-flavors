import { useEffect, useState } from "react";
import Navbar from "../ui/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);
  return (
    <>
      <Navbar />
      <div
        style={{ paddingTop: `${navbarHeight}px` }}
        className="min-h-screen flex flex-col items-center justify-center bg-primary"
      >
        <main className="w-full max-w-4xl p-4">
          <Outlet />
        </main>
      </div>
    </>
  );
};
export default Layout;
