import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createPost } from '../redux/slices/post/postSlice';

export const AddPostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');
  const [image, setImage] = React.useState('');

  const handleSubmit = () => {
    try {
      const data = new FormData();
      data.append('title', title);
      data.append('text', text);
      data.append('image', image);
      dispatch(createPost(data));
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="page__add-post add-post">
      <div className="add-post__container">
        <form className="add-post__form form-add-post" onSubmit={(e) => e.preventDefault()}>
          <label className="form-add-post__label button">
            Add image
            <input onChange={(e) => setImage(e.target.files[0])} type="file" hidden />
          </label>
          <div className="form-add-post__image">
            { image && (
              <img src={URL.createObjectURL(image)} alt='ImagePost'/>
            )}
          </div>

          <label className="form-add-post__label">
            Title post:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-add-post__input"
            />
          </label>

          <label className="form-add-post__label">
            Text post:
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="form-add-post__input form-add-post__input_text"
            />
          </label>

          <div className="form-add-post__actions">
            <button
              onClick={handleSubmit}
              type="submit"
              className="form-add-post__button-add button"
            >
              Add post
            </button>
            <Link to="/" className="form-add-post__button-out button">
              Out
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
