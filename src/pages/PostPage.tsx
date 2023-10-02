import React from 'react';
// import Moment from 'react-moment';
import {
  AiFillDelete,
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiOutlineLike,
} from 'react-icons/ai';
import { Link, Params, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import badWords from 'bad-words';

import axios from '../utils/axios';
import { deletePost, getOnePost } from '../redux/slices/post/postSlice';
import { checkIsAuth } from '../redux/slices/auth/authSlice';
import { createComment, getPostComments } from '../redux/slices/comment/commentSlice';

import { CommentItem } from '../components/CommentItem';
import { RootState, useAppDispatch } from '../redux/store';

import noAvatarPng from '../assets/noavatar.png';

const API_URL = import.meta.env.VITE_API_URL;

export const PostPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params: Readonly<Params<string>> = useParams();
  const isAuth = useSelector(checkIsAuth);

  const { user } = useSelector((state: RootState) => state.auth);
  const { comments } = useSelector((state: RootState) => state.comment);
  const { post } = useSelector((state: RootState) => state.post);

  const [comment, setComment] = React.useState<string>('');
  const [likes, setLikes] = React.useState<number | undefined>(post?.likes?.length);

  const deletePostHandler = () => {
    try {
      if (window.confirm('Are you sure you want to delete the post?')) {
        dispatch(deletePost(params.id as string));
        toast.success('The post has been deleted');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    try {
      const postId = params.id;
      const userName = user.userName;
      const userAvatar = user.avatarUrl;

      // Check if comment is in English
      if (/[\u0400-\u04FF]/g.test(comment)) {
        toast.error('Comment should be in English');
        return;
      }
      // Check if comment is empty or less than 6 characters
      if (comment.trim().length < 6) {
        toast.error('Comment should contain at least 6 characters');
        return;
      }
      // Check if comment contains bad words
      const filter = new badWords();
      if (filter.isProfane(comment)) {
        toast.error('Comment should not contain profane or offensive language');
        return;
      } else {
        dispatch(createComment({ postId, comment, userName, userAvatar }));
        toast.success('Added a new comment');
        setComment('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const likePostHandler = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`/likes/${params.id}`);

      if (data.success) {
        toast.success('You have favorited');
        setLikes(data.likes);
      } else {
        toast('You have favorited');
      }
    } catch (error) {
      console.log(error);
    }
  }, [params]);

  React.useEffect(() => {
    async function fetchPost() {
      try {
        dispatch(getOnePost(params));
      } catch (error) {
        alert('Error receiving post!');
        navigate('/');
      }
    }

    async function fetchComments() {
      try {
        if (params.id) {
          dispatch(getPostComments(params.id));
        }
      } catch (error) {
        alert('Error receiving comments!');
      }
    }

    setLikes(post?.likes?.length);

    fetchPost();
    fetchComments();
  }, [params, dispatch, navigate, post?.likes?.length]);

  return (
    <section className="page__post post-page">
      <div className="post-page__container">
        <Link to={'/'} className="post-page__button button">
          Back
        </Link>

        <div className="post-page__body body-post">
          <article className="body-post__item">
            <div className={post?.imgUrl ? 'body-post__image' : 'body-post__image none'}>
              {post?.imgUrl && <img src={`${API_URL}/${post?.imgUrl}`} alt="ImagePost" />}
            </div>
            <div className="body-post__content">
              <div className="body-post__info">
                <div className="body-post__author">
                  {post?.userAvatar ? (
                    <img src={`${API_URL}/${post.userAvatar}`} alt="ImagePost" />
                  ) : (
                    <img src={noAvatarPng} alt="Avatar" />
                  )}

                  <h3>{post?.userName}</h3>
                </div>
                <div className="body-post__date">
                  {/* <Moment date={post?.createdAt} format="D MMM YYYY" /> */}
                </div>
              </div>
              <h2 className="body-post__title">{post?.title}</h2>
              <div className="body-post__text">
                {post?.text?.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <div className="body-post__actions actions-post ">
                <div className="actions-post__row">
                  <div className="actions-post__view">
                    <AiFillEye /> <span>{post?.views}</span>
                  </div>
                  <div className="actions-post__comments">
                    <AiOutlineMessage /> <span>{post?.comments?.length || 0}</span>
                  </div>
                  <button onClick={likePostHandler} className="actions-post__popular">
                    <AiOutlineLike />
                    <span>{likes}</span>
                  </button>
                </div>
                {user?._id === post?.author && (
                  <div className="actions-post__row">
                    <button className="actions-post__edit">
                      <Link to={`/${params.id}/edit`}>
                        <AiTwotoneEdit />
                      </Link>
                    </button>
                    <button onClick={deletePostHandler} className="actions-post__delete">
                      <AiFillDelete />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </article>

          <aside className="body-post__aside aside-body">
            <h3 className="aside-body__title">Comments:</h3>

            {isAuth && (
              <form className="aside-body__form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="New comment"
                />
                <button onClick={handleSubmit} className="aside-body__button button" type="submit">
                  Send
                </button>
              </form>
            )}
            <ul className="aside-body__comments comments">
              {comments
                ?.map((cmt) => <CommentItem key={cmt._id} cmt={cmt} user={user} />)
                .reverse()}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};
