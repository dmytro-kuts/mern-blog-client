import React from 'react';
import Moment from 'react-moment';

export const CommentItem = ({ cmt }) => {
  const userName = cmt.userName;
  return (
    <li className="comments__item">
      <div className="comments__author">
        <img src="assets/noavatar.png" alt="Avatar" />
        <h3>{userName}</h3>
      </div>
      <div className="comments__body">
        <Moment date={cmt.createdAt} format="HH:mm   DD-MM-YYYY " />
        <p className="">{cmt.comment}</p>
      </div>
    </li>
  );
};
