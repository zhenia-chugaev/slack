import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeChannel: '',
  channelInProgress: '',
  status: 'idle',
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActiveChannel: (channels, { payload }) => {
      channels.activeChannel = payload;
    },
    setChannelInProgress: (channels, { payload }) => {
      channels.channelInProgress = payload;
    },
    setChannelsStatus: (channels, { payload }) => {
      channels.status = payload;
    },
  },
  selectors: {
    selectChannelsInfo: (channels) => channels,
  },
});

export const {
  setActiveChannel,
  setChannelInProgress,
  setChannelsStatus,
} = channelsSlice.actions;

export const { selectChannelsInfo } = channelsSlice.selectors;
export default channelsSlice;
