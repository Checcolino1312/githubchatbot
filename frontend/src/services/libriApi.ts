import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Libro } from '../types/Libro'; // definisci il tipo

export const libriApi = createApi({
  reducerPath: 'libriApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/prestiti' }),
  endpoints: (builder) => ({
    getLibriInGiro: builder.query<Libro[], void>({
      query: () => '/libri-in-giro',
    }),
  }),
});

export const { useGetLibriInGiroQuery } = libriApi;
