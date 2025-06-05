import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const libriApi = createApi({
    reducerPath: 'libriApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/prestiti' }),
    endpoints: (builder) => ({
        getLibriInGiro: builder.query({
            query: () => '/libri-in-giro',
        }),
    }),
});
export const { useGetLibriInGiroQuery } = libriApi;
