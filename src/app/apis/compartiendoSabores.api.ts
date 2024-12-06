//src/app/apis/compartiendoSabores.api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  User,
  UserCredentials,
  LoginResponse,
  Recipe,
  Chat,
  Message,
} from "../../interfaces/index";

export const compartiendoSaboresApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Recipes"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "api/user/",
    }),

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
      query: () => "api/recipe/",
      providesTags: ["Recipes"],
    }),

    // Chat endpoint
    createChat: builder.mutation<Chat, { owner_id: string; friend_id: string }>(
      {
        query: (chat) => ({
          url: "api/chat/create",
          method: "POST",
          body: chat,
        }),
      },
    ),
    getChatsByUserId: builder.query<Chat[], string>({
      query: (user_id) => `api/chat/${user_id}`,
    }),
    getOneChat: builder.query<Chat[], { owner_id: string; friend_id: string }>({
      query: (ids) => `api/chat/${ids.owner_id}/${ids.friend_id}`,
    }),
    // Message endpoint
    createMessage: builder.mutation<Message, Partial<Message>>({
      query: (message) => ({
        url: "api/message/create",
        method: "POST",
        body: message,
      }),
    }),
    getMessagesByChatId: builder.query<Message[], string>({
      query: (chat_id) => `api/message/${chat_id}`,
    }),
    getRecipeById: builder.query<Recipe, string>({
      query: (id) => ({
        url: `api/recipe/${id}`,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUsersQuery,
  useCreateUserMutation,
  useGetRecipesQuery,
  useCreateRecipeMutation,
  useCreateChatMutation,
  useCreateMessageMutation,
  useGetChatsByUserIdQuery,
  useGetMessagesByChatIdQuery,
  useGetOneChatQuery,
  useGetRecipeByIdQuery,
  useGetUserByIdQuery,
} = compartiendoSaboresApi;
