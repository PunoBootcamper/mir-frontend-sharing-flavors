//src/app/apis/compartiendoSabores.api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { User, UserCredentials } from "../../interfaces/index";

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
    login: builder.mutation<User, Partial<UserCredentials>>({
      query: (user) => ({
        url: "/auth/local/login",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useLoginMutation, useCreateUserMutation } =
  compartiendoSaboresApi;
