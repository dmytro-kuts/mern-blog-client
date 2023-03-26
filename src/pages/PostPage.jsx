import React from 'react';
import Moment from 'react-moment';
import { AiFillDelete, AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiOutlineLike} from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import axios from '../utils/axios';
import { deletePost } from '../redux/slices/post/postSlice';
import { checkIsAuth } from '../redux/slices/auth/authSlice';
import { createComment, getPostComments } from '../redux/slices/comment/commentSlice';
import { CommentItem } from '../components/CommentItem';

export const PostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);

  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);
  const params = useParams();

  const [post, setPost] = React.useState([]);
  const [comment, setComment] = React.useState('');

  const deletePostHandler = () => {
    try {
      dispatch(deletePost(params.id));
      toast('The post has been deleted');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    try {
      const postId = params.id;
      const userName = user.userName;
      dispatch(createComment({ postId, comment, userName }));
      toast('Added a new comment');
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = React.useCallback(async () => {
    try {
      dispatch(getPostComments(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [params.id, dispatch]);

  const fetchPost = React.useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  React.useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  React.useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <section className="page__post post-page">
      <div className="post-page__container">
        <Link to={'/'} className="post-page__button button">
          Back
        </Link>

        <div className="post-page__body body-post">
          <div className="body-post__item">
            <div className={post.imgUrl ? 'body-post__image' : 'body-post__image none'}>
              {post.imgUrl && <img src={`http://localhost:4444/${post.imgUrl}`} alt="ImagePost" />}
            </div>
            <div className="body-post__content">
              <div className="body-post__info">
                <div className="body-post__name">{post.userName}</div>
                <div className="body-post__date">
                  <Moment date={post.createdAt} format="D MMM YYYY" />
                </div>
              </div>
              <h2 className="body-post__title">{post.title}</h2>
              <div className="body-post__text">
                <p>{post.text}</p>
              </div>
              <div className="body-post__actions actions-post ">
                <div className="actions-post__row">
                  <div className="actions-post__view">
                    <AiFillEye /> <span>{post.views}</span>
                  </div>
                  <div className="actions-post__comments">
                    <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
                  </div>
                  <button className="actions-post__popular">
                    <AiOutlineLike /> <span>{post.comments?.length || 0}</span>
                  </button>
                </div>
                {user?._id === post.author && (
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
          </div>

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
              {comments?.map((cmt) => (
                <CommentItem key={cmt?._id} cmt={cmt} />
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};
