import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PrestitoLibroDto } from "../types/PrestitoLibroDto";
import type { Libro } from "../types/Libro"; // o cambia il path

export const prestitoApi = createApi({
  reducerPath: "prestitoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/" }),
  endpoints: (builder) => ({
    creaPrestito: builder.mutation<Blob, PrestitoLibroDto>({
      query: (body) => ({
        url: "prestiti",
        method: "POST",
        body,
        responseHandler: (response) => response.blob(),
      }),
    }),
    getLibriInGiro: builder.query<Libro[], void>({
      query: () => "prestiti/libri-in-giro",
    }),
  }),
});

export const {
  useCreaPrestitoMutation,
  useGetLibriInGiroQuery, // <-- ora disponibile nel frontend
} = prestitoApi;
