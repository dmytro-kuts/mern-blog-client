import React from 'react';
import Moment from 'react-moment';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import { useCallback } from 'react';
import axios from '../utils/axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const PostPage = () => {
  const [post, setPost] = React.useState([]);
  const params = useParams();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  React.useEffect(()=> {
    fetchPost()
  },[fetchPost])

  return (
    <section className="page__post post-page">
      <div className="post-page__container">
        <Link to={'/'} className="post-page__button button">Back</Link>

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
              <div className="body-post__actions">
                <button className="body-post__view">
                  <AiFillEye /> <span>{post.views}</span>
                </button>
                <button className="body-post__popular">
                  <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
                </button>
              </div>
            </div>
          </div>

          <aside className="body-post__aside aside-body">
            <ul className="aside-body__title">Comments</ul>
          </aside>
        </div>
      </div>
    </section>
  );
};
