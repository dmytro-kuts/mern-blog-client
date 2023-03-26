import { configureStore } from '@reduxjs/toolkit';

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
