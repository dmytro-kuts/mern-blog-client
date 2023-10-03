import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { PostItem } from '../components/PostItem';
import { PopularPosts } from '../components/PopularPosts';
import { getAllPosts } from '../redux/slices/post/postSlice';
import { RootState, useAppDispatch } from '../redux/store';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { posts, popularPosts } = useSelector((state: RootState) => state.post);

  React.useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch, navigate]);

  return (
    <section className='page__мain мain'>
      <div className='мain__container'>
        <div className='мain__post-items'>
          {posts?.map((post) => <PostItem key={post._id} post={post} />)}
        </div>
        <aside className='мain__aside aside-body'>
          <h3 className='aside-body__title'>Popular:</h3>
          <ul className='aside-body__items'>
            {popularPosts?.map((post) => (
              <PopularPosts key={post._id} post={post} />
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
};
