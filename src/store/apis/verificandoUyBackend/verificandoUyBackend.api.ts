import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  FilterHechosArgs,
  LoginArgs,
  LogoutArgs,
  RegisterUsuarioArgs,
} from "../types/verificandoUy.types";
import { Hecho } from "../../../interfaces/hecho.interfaces";

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
    getFilterHechos: builder.query<Hecho[], FilterHechosArgs>({
      query: ({ checkerId, estado, submitterId }) =>
        `/api/hechos/filter?estado=${estado}&submitterId=${submitterId}&checkerId=${checkerId}`,
    }),
  }),
});
export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useGetRolesQuery,
  useLazyGetFilterHechosQuery,
} = verificandoUyApi;
