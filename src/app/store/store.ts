//src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { compartiendoSaboresApi } from "../apis/compartiendoSabores.api";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    [compartiendoSaboresApi.reducerPath]: compartiendoSaboresApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(compartiendoSaboresApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
