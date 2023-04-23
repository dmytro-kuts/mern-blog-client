import React from 'react';
import Moment from 'react-moment';

export const CommentItem = ({ cmt }) => {
  return (
    <li className="comments__item">
      <div className="comments__header">
        <div className="comments__author">
          {cmt?.userAvatar ? (
            <img src={`http://localhost:4444/${cmt.userAvatar}`} alt="ImagePost" />
          ) : (
            <img src="assets/noavatar.png" alt="Avatar" />
          )}
          <h3>{cmt.userName}</h3>
        </div>
        <div className="comments__date">
          <Moment date={cmt.createdAt} format="HH:mm   DD-MM-YYYY " />
        </div>
      </div>
      <div className="comments__text">
        <p >{cmt.comment}</p>
      </div>
    </li>
  );
};
