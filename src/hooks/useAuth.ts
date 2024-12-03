import { useState, useEffect, useCallback } from "react";
import { User } from "../interfaces/User";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Inicializar con datos de localStorage
    const storedUser = localStorage.getItem("user");
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      isAuthenticated: !!storedUser,
    };
  });

  const loginSuccess = useCallback((user: User) => {
    setAuthState({ user, isAuthenticated: true });
    localStorage.setItem("user", JSON.stringify(user)); // Guardar en localStorage
  }, []);

  const logout = useCallback(() => {
    setAuthState({ user: null, isAuthenticated: false });
    localStorage.removeItem("user"); // Eliminar del localStorage
  }, []);

  const loadUserFromStorage = useCallback(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
      });
    }
  }, []);

  useEffect(() => {
    // Escuchar cambios en localStorage para mantener sincronización
    const handleStorageChange = () => {
      loadUserFromStorage();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadUserFromStorage]);

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    loginSuccess,
    logout,
  };
};
