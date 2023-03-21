import React from 'react';
import axios from '../utils/axios';
import { PostItem } from '../components/PostItem';

export const PostsPage = () => {
  const [posts, setPosts] = React.useState([]);

  const fetchMyPosts = async () => {
    try {
      const { data } = await axios.get(`/posts/all/me`);
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchMyPosts();
  }, []);
  return (
    <div className="page__posts posts">
      <div className="posts__container">
        {posts?.map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
      </div>
    </div>
  );
};
