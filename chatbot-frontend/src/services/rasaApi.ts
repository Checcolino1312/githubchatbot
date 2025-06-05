import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Imposta l'endpoint base in base all'ambiente
const baseUrl =
  import.meta.env.MODE === 'development'
    ? '/webhooks' // Proxy attivo solo con Vite dev server
    : 'http://localhost:5005/webhooks'; // In produzione, il browser parla con Rasa esposto su host

export const rasaApi = createApi({
  reducerPath: 'rasaApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<
      {
        recipient_id: string;
        text?: string;
        buttons?: { title: string; payload: string }[];
      }[],
      { sender: string; message: string }
    >({
      query: (body) => ({
        url: '/rest/webhook',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSendMessageMutation } = rasaApi;
