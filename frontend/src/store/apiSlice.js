import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';
import { setActiveChannel } from './channelsSlice';

const prepareHeaders = (headers, { getState }) => {
  const { auth: { data: { token } } } = getState();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};

const subscribeToChannelsUpdates = async (_, {
  dispatch,
  getState,
  cacheDataLoaded,
  cacheEntryRemoved,
  updateCachedData,
}) => {
  const socket = io();
  try {
    await cacheDataLoaded;
    socket
      .on('newChannel', (newChannel) => {
        updateCachedData((channels) => {
          channels.push(newChannel);
        });
      })
      .on('removeChannel', ({ id }) => {
        updateCachedData((channels) => (
          channels.filter((channel) => channel.id !== id)
        ));
        if (id === getState().channels.activeChannel) {
          dispatch(setActiveChannel(''));
        }
      })
      .on('renameChannel', (renamedChannel) => {
        updateCachedData((channels) => (
          channels.map((channel) => (
            channel.id === renamedChannel.id ? renamedChannel : channel
          ))
        ));
      });
  } finally {
    await cacheEntryRemoved;
    socket.close();
  }
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
    signup: builder.mutation({
      query: (credentials) => ({
        method: 'POST',
        url: '/signup',
        body: credentials,
      }),
    }),
    getChannels: builder.query({
      query: () => '/channels',
      onCacheEntryAdded: subscribeToChannelsUpdates,
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        url: '/channels',
        body: channel,
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, changes }) => ({
        method: 'PATCH',
        url: `/channels/${id}`,
        body: changes,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: `/channels/${id}`,
      }),
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
  useSignupMutation,
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
  useGetMessagesQuery,
  useAddMessageMutation,
} = apiSlice;

export default apiSlice;
