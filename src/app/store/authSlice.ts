import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginResponse } from "../../interfaces";
import {
  safeParseJSON,
  validateUserStructure,
} from "../../utils/localStorageUtils";

// Estado inicial de autenticación
interface AuthState {
  user: LoginResponse | null;
  isAuthenticated: boolean;
}

// Intentamos parsear el usuario de localStorage de forma segura
const parsedUser = safeParseJSON(localStorage.getItem("user"));

if (parsedUser === null) {
  // Si es nulo, significa que el parseo falló o no había datos válidos
  localStorage.removeItem("user");
}

const initialState: AuthState = {
  user: validateUserStructure(parsedUser),
  isAuthenticated: parsedUser !== null,
};

// Slice de autenticación
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
    loadUserFromStorage: (state) => {
      try {
        const storedUser = localStorage.getItem("user");
        const parsed = safeParseJSON(storedUser);
        if (parsed !== null) {
          const validUser = validateUserStructure(parsed);
          if (validUser) {
            state.user = validUser;
            state.isAuthenticated = true;
          } else {
            throw new Error(
              "La estructura del usuario en localStorage es inválida",
            );
          }
        } else {
          // Si es nulo significa que no hay datos válidos
          state.user = null;
          state.isAuthenticated = false;
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error(
          "Error al cargar el usuario desde localStorage. Datos corruptos o no válidos:",
          error,
        );
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user"); // Limpia los datos corruptos
      }
    },
  },
});

export const { loginSuccess, logout, loadUserFromStorage } = authSlice.actions;

export default authSlice.reducer;
