import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../../utils/axios';
import { RootState } from '../../store';

export interface User {
  _id: string;
  userName: string;
  email: string;
  password: string;
  posts: string[];
  avatarUrl?: string;
}

export interface AuthState {
  user: any | null;
  token: string | null;
  isLoading: boolean;
  status: string | null;
}


export interface LoginParams {
  email: string;
  password: string;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};
//========================================================================================================================================================

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (params: FormData) => {
    try {
      const { data } = await axios.post('/auth/register', params);

      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  },
);
//========================================================================================================================================================

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: LoginParams) => {
    try {
      const { data } = await axios.post('/auth/login', {
        email,
        password,
      });

      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  },
);
//========================================================================================================================================================

export const getMe = createAsyncThunk('auth/getMe', async () => {
  const { data } = await axios.get('/auth/me');

  return data;
});
//========================================================================================================================================================

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    // registerUser
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.status = String(action.payload);
    });
    // loginUser
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.status = String(action.payload);
    });
    // getMe
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
      state.status = null;
    });
    builder.addCase(getMe.rejected, (state) => {
      state.isLoading = false;
      state.status = null;
    });
  },
});

export const checkIsAuth = (state: RootState) => Boolean(state.auth.token);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
