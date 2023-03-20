import React from 'react';

export const PopularPosts = ({ post }) => {
  return (
    <li className="aside-body__list">
      <div className="aside-body__item">{post.title}</div>
    </li>
  );
};
