import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../../utils/axios';

const initialState = {
  post: [],
  posts: [],
  popularPosts: [],
  isLoading: false,
  status: null,
};

export const createPost = createAsyncThunk('post/createPost', async (params) => {
  try {
    const { data } = await axios.post('/posts', params);

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getOnePost = createAsyncThunk('posts/getOnePost', async (params) => {
  try {
    const { data } = await axios.get(`/posts/${params.id}`, params);
    
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
  try {
    const { data } = await axios.get('/posts');

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const deletePost = createAsyncThunk('post/deletePost', async (id) => {
  
  try {
    const { data } = await axios.delete(`/posts/${id}`, id);

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updatePost = createAsyncThunk('post/updatePost', async (dataUpdate) => {
  try {
    const { data } = await axios.put(`/posts/${dataUpdate.id}`, dataUpdate);

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // createPost
    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts.push(action.payload);
      state.status = action.payload.message;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    });

    // getOnePost
    builder.addCase(getOnePost.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(getOnePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
      state.status = action.payload.message;
    });
    builder.addCase(getOnePost.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    });

    // getAllPosts
    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.posts;
      state.popularPosts = action.payload.popularPosts;
      state.status = action.payload.message;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    });

    // deletePost
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.filter((post) => post._id !== action.payload._id);
      state.status = action.payload.message;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    });

    // updatePost
    builder.addCase(updatePost.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.posts.findIndex((post) => post._id === action.payload._id);
      state.posts[index] = action.payload;
      state.status = action.payload.message;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    });
  },
});

export default postSlice.reducer;
