//src/app/apis/compartiendoSabores.api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  User,
  UserCredentials,
  LoginResponse,
  Recipe,
  Comment,
  Chat,
  Message,
} from "../../interfaces/index";

export const compartiendoSaboresApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Recipes"],
  endpoints: (builder) => ({
    /*end points user  */
    getUsers: builder.query<User[], void>({
      query: () => "api/user/",
    }),

    getUserById: builder.query<User, string>({
      query: (id) => `api/user/${id}`,
    }),

    updateUser: builder.mutation<User, Partial<User>>({
      query: (body) => {
        const user = JSON.parse(localStorage.getItem("user") || "");
        return {
          url: `api/user/${body._id}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body,
        };
      },
      async onQueryStarted({ _id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          compartiendoSaboresApi.util.updateQueryData(
            "getUserById",
            _id || "",
            (draft) => {
              Object.assign(draft, patch);
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
          url: "api/chat/",
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
        url: "api/message/",
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
    getComments: builder.query<Comment[], string>({
      query: (recipeId) => `api/comment/${recipeId}`,
    }),
    createComment: builder.mutation<Comment, Partial<Comment>>({
      query: (comment) => ({
        url: `api/comment`,
        method: "POST",
        body: comment,
      }),
      async onQueryStarted(
        { recipe_id, ...newComment },
        { dispatch, queryFulfilled },
      ) {
        // Actualización optimista
        const patchResult = dispatch(
          compartiendoSaboresApi.util.updateQueryData(
            "getComments",
            recipe_id || "",
            (draft) => {
              draft.push({
                _id: Math.random().toString(), // ID temporal
                user_id: newComment.user_id || "", // Aseguramos que exista un user_id
                recipe_id: recipe_id || "", // Asociamos al recipe_id
                rating: newComment.rating || 0, // Valor predeterminado si no está presente
                comment: newComment.comment || "Comentario temporal", // Texto predeterminado
                __v: 0, // Valor inicial para versiones
              });
            },
          ),
        );

        try {
          // Espera la confirmación de la API
          await queryFulfilled;
        } catch {
          // Revierte la actualización optimista si la API falla
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetRecipesQuery,
  useCreateRecipeMutation,
  useGetRecipeByIdQuery,
  useCreateChatMutation,
  useCreateMessageMutation,
  useGetChatsByUserIdQuery,
  useGetMessagesByChatIdQuery,
  useGetOneChatQuery,
  useGetUserByIdQuery,
  useCreateCommentMutation,
  useGetCommentsQuery,
} = compartiendoSaboresApi;
