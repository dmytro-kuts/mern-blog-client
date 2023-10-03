import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Params } from 'react-router-dom';

import axios from '../../../utils/axios';

export interface Like {
  userId: string;
  postId: string;
}

export interface Comment {
  _id: string;
  userAvatar: string;
  userName: string;
  comment: string;
  author: string;
}
export interface Post {
  message?: string | null;
  _id: string;
  userAvatar: string;
  userName: string;
  title: string;
  text: string;
  imgUrl: string;
  views: number;
  author: string;
  comments: Comment[];
  likes: Like[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostState {
  post: Post | null;
  posts: Post[];
  popularPosts: Post[];
  isLoading: boolean;
  status: string | null;
}

const initialState: PostState = {
  post: null,
  posts: [],
  popularPosts: [],
  isLoading: false,
  status: null,
};

//========================================================================================================================================================
export const createPost = createAsyncThunk(
  'post/createPost',
  async (params: FormData) => {
    try {
      const { data } = await axios.post('/posts', params);

      return data;
    } catch (error) {
      console.log(error);
    }
  },
);
//========================================================================================================================================================

export const getOnePost = createAsyncThunk(
  'posts/getOnePost',
  async (params: Readonly<Params<string>>) => {
    try {
      const { data } = await axios.get(`/posts/${params.id}`, params);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);
//========================================================================================================================================================

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
  try {
    const { data } = await axios.get('/posts');

    return data;
  } catch (error) {
    console.log(error);
  }
});
//========================================================================================================================================================

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (id: string) => {
    try {
      const { data } = await axios.delete(`/posts/${id}`, {
        data: { id },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  },
);
//========================================================================================================================================================

export const updatePost = createAsyncThunk(
  'post/updatePost',
  async (dataUpdate: FormData) => {
    try {
      const id = dataUpdate.get('id') as string;
      const { data } = await axios.put(`/posts/${id}`, dataUpdate);

      return data;
    } catch (error) {
      console.log(error);
    }
  },
);
//========================================================================================================================================================
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
      if (action.payload) {
        state.isLoading = false;
        state.posts.push(action.payload);
        state.status = action.payload.message;
      }
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false;
      state.status = String(action.payload);
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
      state.status = String(action.payload);
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
      state.status = String(action.payload);
    });

    // deletePost
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id,
      );
      state.status = action.payload.message;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.isLoading = false;
      state.status = String(action.payload);
    });

    // updatePost
    builder.addCase(updatePost.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id,
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      state.status = action.payload.message;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.isLoading = false;
      state.status = String(action.payload);
    });
  },
});

export default postSlice.reducer;
