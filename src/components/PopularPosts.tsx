import React from 'react';
import { Link } from 'react-router-dom';

interface Post {
  _id: string;
  title: string;
}
interface PostItemProps {
  post: Post | null;
}
export const PopularPosts: React.FC<PostItemProps> = ({ post }) => {
  return (
    <li className='aside-body__list'>
      <Link to={`/${post?._id}`}>{post?.title}</Link>
    </li>
  );
};
