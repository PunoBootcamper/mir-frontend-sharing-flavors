//src/app/apis/compartiendoSabores.api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { User, UserCredentials, LoginResponse } from "../../interfaces/index";

interface LoginResponse {
  token: string;
  profile: {
    fullName: string;
    avatar: string;
    role: string;
    email: string;
  };
}
export const compartiendoSaboresApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),

  endpoints: (builder) => ({
    createUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "api/user/",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<LoginResponse, UserCredentials>({
      query: (credentials) => ({
        url: "/auth/local/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useCreateUserMutation } =
  compartiendoSaboresApi;
