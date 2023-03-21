import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { Layout } from './components/Layout';
import { MainPage } from './pages/MainPage';
import { PostsPage } from './pages/PostsPage';
import { PostPage } from './pages/PostPage';
import { AddPostPage } from './pages/AddPostPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { EditPostPage } from './pages/EditPostPage';
import {  getMe } from './redux/slices/auth/authSlice';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="add" element={<AddPostPage />} />
        <Route path=":id" element={<PostPage />} />
        <Route path=":id/edit" element={<EditPostPage />} />
      </Routes>

      <ToastContainer position='bottom-right' />
    </Layout>
  );
}

export default App;
