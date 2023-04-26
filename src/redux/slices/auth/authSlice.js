import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../../utils/axios';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (params) => {
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

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
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
});

export const getMe = createAsyncThunk('auth/getMe', async () => {
  const { data } = await axios.get('/auth/me');

  return data;
});

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
      state.status = action.payload.message;
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
      state.status = action.payload.message;
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

export const checkIsAuth = (state) => Boolean(state.auth.token);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
