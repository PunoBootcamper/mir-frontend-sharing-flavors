import { useEffect, useState } from "react";
import Navbar from "../ui/Navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
        {" "}
        {/*}
        <div className="text-center font-cookie">
          <h1 className="font-cookie text-3xl md:text-5xl max-w-md text-white">
            ¡Bienvenid@ a Compartiendo Sabores!
          </h1>
        </div>*/}
        <main className="w-full max-w-4xl p-4">{children}</main>
      </div>
    </>
  );
};
export default Layout;
