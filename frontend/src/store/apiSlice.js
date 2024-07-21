import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';

const prepareHeaders = (headers, { getState }) => {
  const { auth: { data: { token } } } = getState();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};

const subscribeToNewMessages = async (_, {
  cacheDataLoaded,
  cacheEntryRemoved,
  updateCachedData,
}) => {
  const socket = io();
  try {
    await cacheDataLoaded;
    socket.on('newMessage', (newMessage) => {
      updateCachedData((messages) => {
        messages.push(newMessage);
      });
    });
  } finally {
    await cacheEntryRemoved;
    socket.close();
  }
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
    getChannels: builder.query({
      query: () => '/channels',
    }),
    getMessages: builder.query({
      query: () => '/messages',
      onCacheEntryAdded: subscribeToNewMessages,
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        url: '/messages',
        body: message,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetChannelsQuery,
  useGetMessagesQuery,
  useAddMessageMutation,
} = apiSlice;

export default apiSlice;
