import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LoginArgs,
  LogoutArgs,
  RegisterUsuarioArgs,
} from "../types/verificandoUy.types";

const verificandoUYApiURL = "http://localhost:8080";

export const verificandoUyApi = createApi({
  reducerPath: "verificandoUyApi",
  baseQuery: fetchBaseQuery({ baseUrl: verificandoUYApiURL }),
  endpoints: (builder) => ({
    login: builder.mutation<string, LoginArgs>({
      query: (body) => ({
        url: "/logIn",
        method: "POST",
        body,
        responseHandler: (response) => response.text(),
      }),
    }),
    logout: builder.mutation<string, LogoutArgs>({
      query: (body) => ({
        url: "/logOut",
        method: "POST",
        body: body,
        responseHandler: (response) => response.text(),
      }),
    }),
    signup: builder.mutation<string, RegisterUsuarioArgs>({
      query: (body) => ({
        url: "/registerUsuario",
        method: "POST",
        body,
        responseHandler: (response) => response.text(),
      }),
    }),
    getRoles: builder.query<string[], void>({
      query: () => "/roles",
    }),
  }),
});
export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useGetRolesQuery,
} = verificandoUyApi;
