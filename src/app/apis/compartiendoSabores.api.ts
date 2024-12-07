//src/app/apis/compartiendoSabores.api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  User,
  UserCredentials,
  LoginResponse,
  Recipe,
  Comment,
} from "../../interfaces/index";

export const compartiendoSaboresApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Recipes"],
  endpoints: (builder) => ({
    getUserById: builder.query<User, string>({
      query: (id) => `api/user/${id}`,
    }),
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
    createRecipe: builder.mutation<Recipe, Partial<Recipe>>({
      query: (body) => ({
        url: "api/recipe/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Recipes"],
    }),
    getRecipes: builder.query<Recipe[], void>({
      query: () => "/api/recipe/",
      providesTags: ["Recipes"],
    }),
    getRecipeById: builder.query<Recipe, string>({
      query: (id) => ({
        url: `api/recipe/${id}`,
      }),
    }),
    getComments: builder.query<Comment[], string>({
      query: (recipeId) => `api/comment/${recipeId}`,
    }),
    createComment: builder.mutation<Comment, Partial<Comment>>({
      query: (comment) => ({
        url: `api/comment/`,
        method: "POST",
        body: comment,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateUserMutation,
  useGetRecipesQuery,
  useCreateRecipeMutation,
  useGetRecipeByIdQuery,
  useGetUserByIdQuery,
  useCreateCommentMutation,
  useGetCommentsQuery,
} = compartiendoSaboresApi;
