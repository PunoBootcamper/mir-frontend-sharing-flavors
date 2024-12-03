import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginResponse } from "../../interfaces";

interface AuthState {
  user: LoginResponse | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: !!localStorage.getItem("user"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      // Guardar el usuario en localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      // Eliminar del localStorage
      localStorage.removeItem("user");
    },
    loadUserFromStorage: (state) => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        state.user = JSON.parse(storedUser);
        state.isAuthenticated = true;
      }
    },
  },
});

export const { loginSuccess, logout, loadUserFromStorage } = authSlice.actions;

export default authSlice.reducer;
