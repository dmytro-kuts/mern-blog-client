// import Moment from 'react-moment';
import { AiFillEye, AiOutlineMessage, AiOutlineLike } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Post } from '../redux/slices/post/postSlice';

const API_URL = import.meta.env.VITE_API_URL;

import noAvatarPng from '../assets/noavatar.png';

interface PostItemProps {
  post: Post | null;
}
export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  if (!post) {
    return <div className='post-item__null'>Loading...</div>;
  }
  return (
    <article className='post-item__body'>
      <Link to={`/${post._id}`}>
        <div
          className={post.imgUrl ? 'post-item__image' : 'post-item__image none'}
        >
          {post.imgUrl && (
            <img src={`${API_URL}/${post.imgUrl}`} alt='ImagePost' />
          )}
        </div>
        <div className='post-item__content'>
          <div className='post-item__info'>
            <div className='post-item__author'>
              {post?.userAvatar ? (
                <img src={`${API_URL}/${post.userAvatar}`} alt='ImagePost' />
              ) : (
                <img src={noAvatarPng} alt='Avatar' />
              )}

              <h3>{post.userName}</h3>
            </div>
            <div className='post-item__date'>
              {/* <Moment date={post.createdAt} format="D MMM YYYY" /> */}
            </div>
          </div>
          <h2 className='post-item__title'>{post.title}</h2>
          <div className='post-item__text'>
            <p>{post.text}</p>
          </div>
          <div className='post-item__actions'>
            <div className='post-item__view'>
              <AiFillEye /> <span>{post.views}</span>
            </div>
            <div className='post-item__comments'>
              <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
            </div>
            <button className='post-item__popular'>
              <AiOutlineLike /> <span>{post.likes?.length || 0}</span>
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
};
