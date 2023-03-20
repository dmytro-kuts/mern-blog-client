import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth/authSlice';
import postSlice from './slices/post/postSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
  },
});
