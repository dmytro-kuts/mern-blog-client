import React from 'react';
import Moment from 'react-moment';
import { AiFillDelete, AiFillEye, AiOutlineMessage, AiTwotoneEdit } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import axios from '../utils/axios';
import { deletePost } from '../redux/slices/post/postSlice';

export const PostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [post, setPost] = React.useState([]);
  const params = useParams();

  const deletePostHandler = () => {
    try {
      dispatch(deletePost(params.id));
      toast('The post has been deleted');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPost = React.useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  React.useEffect(() => {
    fetchPost();
  }, [fetchPost]);

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
                  <button className="actions-post__view">
                    <AiFillEye /> <span>{post.views}</span>
                  </button>
                  <button className="actions-post__popular">
                    <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
                  </button>
                </div>
                {user?._id === post.author && (
                  <div className="actions-post__row">
                    <button className="actions-post__edit">
                      <AiTwotoneEdit />
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
            <h3 className="aside-body__title">Comments</h3>
            <ul className="aside-body__items"></ul>
          </aside>
        </div>
      </div>
    </section>
  );
};
