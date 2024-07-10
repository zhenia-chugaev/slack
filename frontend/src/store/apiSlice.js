import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { storage } from '../constants';

const prepareHeaders = (headers) => {
  const stringOrNull = localStorage.getItem(storage.auth());
  const { token } = JSON.parse(stringOrNull) || {};

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
};

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        method: 'POST',
        url: '/login',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = apiSlice;
export default apiSlice;
