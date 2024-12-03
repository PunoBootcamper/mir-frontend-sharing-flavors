import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { logout } from "../../../app/store/authSlice";
import { useNavigate } from "react-router-dom";
import CommonButton from "../Button/CommonButton";

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="border-gray-200 bg-[#d12942]">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a href="/home" className="flex items-center">
          <img src="/logo.ico" className="h-14 w-14" alt="Logo" />
        </a>

        {user ? (
          <div className="relative">
            <button
              type="button"
              className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
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
              <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {user.profile.fullName || "User"}
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    {user.profile.email || "email@example.com"}
                  </span>
                </div>
                <ul className="py-2">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() => {
                        setDropdownOpen(false);
                        dispatch(logout());
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      Logout
                    </a>
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
