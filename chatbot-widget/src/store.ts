// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { rasaApi } from './services/rasaApi';

export const store = configureStore({
  reducer: {
    [rasaApi.reducerPath]: rasaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rasaApi.middleware),
});
