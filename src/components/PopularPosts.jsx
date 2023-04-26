import React from 'react';
import { Link } from 'react-router-dom';

export const PopularPosts = ({ post }) => {
  return (
    <li className="aside-body__list">
      <Link to={`/${post._id}`}>{post.title}</Link>
    </li>
  );
};
