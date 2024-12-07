import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { logout } from "../../../app/store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import CommonButton from "../Button/CommonButton";

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(logout());
  };

  return (
    <nav className="z-40 fixed w-full border-gray-200 bg-[#d12942]">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link to="/home" className="flex items-center">
          <img src="/logo.ico" className="h-14 w-14" alt="Logo" />
        </Link>

        {/* Usuario autenticado */}
        {user ? (
          <div className="relative">
            {/* Botón del dropdown */}
            <button
              type="button"
              className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="menu"
            >
              <span className="sr-only">Abrir menú del usuario</span>
              <img
                className="w-14 h-14 rounded-full"
                src={user.profile.avatar || "https://via.placeholder.com/150"}
                alt="Avatar del usuario"
              />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-600"
                role="menu"
                onBlur={() => setDropdownOpen(false)}
                tabIndex={0}
              >
                {/* Información del usuario */}
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.profile.fullName || "Usuario"}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {user.profile.email || "email@example.com"}
                  </p>
                </div>
                <ul className="py-2" role="none">
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      Chats
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      Editar perfil
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      onClick={() => {
                        setDropdownOpen(false);
                        dispatch(logout());
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          // Botones para no autenticados
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
