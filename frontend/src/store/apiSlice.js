import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const prepareHeaders = (headers, { getState }) => {
  const { auth: { data: { token } } } = getState();

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
