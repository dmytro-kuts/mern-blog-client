import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authSlice from './slices/auth/authSlice';
import postSlice from './slices/post/postSlice';
import commentSlice from './slices/comment/commentSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    comment: commentSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
