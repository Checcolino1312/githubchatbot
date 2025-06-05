// services/rasaApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rasaApi = createApi({
  reducerPath: 'rasaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: (window as any).__CHATBOT_API_URL__ || 'http://localhost:5005',
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (body) => ({
        url: '/webhooks/rest/webhook',
        method: 'POST',
        body,
      }),
    }),
  }),
});
