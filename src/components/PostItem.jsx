import React from 'react';
import Moment from 'react-moment';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export const PostItem = ({ post }) => {
  if (!post) {
    return <div className="post-item__null">Loading</div>;
  }
  return (
    <article className="post-item__body">
      <Link to={`/${post._id}`}>
        <div className={post.imgUrl ? 'post-item__image' : 'post-item__image none'}>
          {post.imgUrl && <img src={`http://localhost:4444/${post.imgUrl}`} alt="ImagePost" />}
        </div>
        <div className="post-item__content">
          <div className="post-item__info">
            <div className="post-item__name">{post.userName}</div>
            <div className="post-item__date">
              <Moment date={post.createdAt} format="D MMM YYYY" />
            </div>
          </div>
          <h2 className="post-item__title">{post.title}</h2>
          <div className="post-item__text">
            <p>{post.text}</p>
          </div>
          <div className="post-item__actions">
            <button className="post-item__view">
              <AiFillEye /> <span>{post.views}</span>
            </button>
            <button className="post-item__popular">
              <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
};
