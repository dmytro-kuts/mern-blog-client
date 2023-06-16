import React from 'react';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../redux/slices/comment/commentSlice';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';

export const CommentItem = ({ cmt, user }) => {
  const dispatch = useDispatch();

  const deleteCommentHandler = () => {
    try {
      const commentId = cmt._id;

      dispatch(deleteComment(commentId));
      toast.success('The comment has been deleted');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="comments__item">
      <div className="comments__header">
        <div className="comments__author">
          {cmt?.userAvatar ? (
            <img src={`${process.env.REACT_APP_API_URL}/${cmt.userAvatar}`} alt="ImagePost" />
          ) : (
            <img src="assets/noavatar.png" alt="Avatar" />
          )}
          <h3>{cmt.userName}</h3>
        </div>
        <div className="comments__information">
          <div className="comments__date">
            <Moment date={cmt.createdAt} format="HH:mm   DD-MM-YYYY " />
          </div>
          {user?.userName === cmt.userName && (
            <button onClick={deleteCommentHandler} className="comments__delete">
              <AiFillDelete />
            </button>
          )}
        </div>
      </div>
      <div className="comments__text">
        <p>{cmt.comment}</p>
      </div>
    </li>
  );
};
