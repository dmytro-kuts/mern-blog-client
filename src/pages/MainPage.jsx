import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PostItem } from '../components/PostItem';
import { PopularPosts } from '../components/PopularPosts';
import { getAllPosts } from '../redux/slices/post/postSlice';

export const MainPage = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts } = useSelector((state) => state.post);

  React.useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (!posts.length) {
    return (
      <div className="мain__container">
        <p>There are no posts yet . . .</p>
      </div>
    );
  }

  return (
    <section className="page__мain мain">
      <div className="мain__container">
        <div className="мain__post-items">
          {posts?.map((post, index) => (
            <PostItem key={index} post={post} />
          ))}
        </div>
        <aside className="мain__aside aside-body">
          <ul className="aside-body__title">
            Popular:
            {popularPosts?.map((post, index) => (
              <PopularPosts key={index} post={post} />
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
};
