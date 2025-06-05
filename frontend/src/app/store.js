import { configureStore } from '@reduxjs/toolkit';
import { prestitoApi } from '../services/prestitoApi';
export const store = configureStore({
    reducer: {
        [prestitoApi.reducerPath]: prestitoApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                'prestitoApi/executeMutation/fulfilled',
                'prestitoApi/executeMutation/rejected',
            ],
            ignoredPaths: ['prestitoApi.mutations'],
        },
    }).concat(prestitoApi.middleware),
});
