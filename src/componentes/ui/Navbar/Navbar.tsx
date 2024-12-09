import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { logout } from "../../../app/store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import CommonButton from "../Button/CommonButton";

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="z-40 fixed w-full border-gray-200 bg-secondary">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link to="/home" className="flex items-center">
          <img src="/logo.ico" className="h-14 w-14" alt="Logo" />
        </Link>
        <div>
          <h1 className="text-5xl font-cookie text-white">
            Compartiendo Sabores
          </h1>
        </div>
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-600"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-14 h-14 rounded-full"
                src={user.profile.avatar || "https://via.placeholder.com/150"}
                alt="User Avatar"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 divide-y rounded-lg shadow bg-gray-700 divide-gray-600">
                <div className="px-4 py-3">
                  <span className="block text-sm text-white">
                    {user.profile.fullName || "User"}
                  </span>
                  <span className="block text-sm truncate text-gray-400">
                    {user.profile.email || "email@example.com"}
                  </span>
                </div>
                <ul className="py-2">
                  <li>
                    <Link
                      to="/chats"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                    >
                      Chats
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                    >
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      onClick={() => {
                        setDropdownOpen(false);
                        dispatch(logout());
                        toast.success("Sesión cerrada");
                      }}
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                    >
                      Cerrar sesión
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex space-x-4">
            <CommonButton
              text="Iniciar Sesión"
              onClick={() => navigate("/login")}
            />
            <CommonButton
              text="Registrarse"
              onClick={() => navigate("/register")}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
