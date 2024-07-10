import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../constants';
import apiSlice from './apiSlice';

const stringOrNull = localStorage.getItem(storage.auth());
const data = JSON.parse(stringOrNull) || {};

const initialState = { data };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.login.matchFulfilled,
      (auth, { payload }) => {
        auth.data = payload;
      },
    );
  },
  selectors: {
    selectAuthData: (auth) => auth.data,
  },
});

export const { selectAuthData } = authSlice.selectors;
export default authSlice;
