import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const prestitoApi = createApi({
    reducerPath: "prestitoApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/" }),
    endpoints: (builder) => ({
        creaPrestito: builder.mutation({
            query: (body) => ({
                url: "prestiti",
                method: "POST",
                body,
                responseHandler: (response) => response.blob(),
            }),
        }),
        getLibriInGiro: builder.query({
            query: () => "prestiti/libri-in-giro",
        }),
    }),
});
export const { useCreaPrestitoMutation, useGetLibriInGiroQuery, // <-- ora disponibile nel frontend
 } = prestitoApi;
