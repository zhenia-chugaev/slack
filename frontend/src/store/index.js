import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './apiSlice';
import authSlice from './authSlice';
import channelsSlice from './channelsSlice';
import { showQueryError } from './middlewares';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [channelsSlice.reducerPath]: channelsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    apiSlice.middleware,
    showQueryError,
  ],
});

export default store;
