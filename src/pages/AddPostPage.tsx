import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import badWords from 'bad-words';

import { createPost } from '../redux/slices/post/postSlice';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../redux/store';

export const AddPostPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');
  const [image, setImage] = React.useState<File | null>(null);

  const handleSubmit = () => {
    try {
      const data: FormData = new FormData();
      data.append('title', title);
      data.append('text', text);
      if (image) {
        data.append('image', image);
      }

      // Check if comment is in English
      if (/[\u0400-\u04FF]/g.test(title)) {
        toast.error('Title should be in English');
        return;
      }
      if (/[\u0400-\u04FF]/g.test(text)) {
        toast.error('Text should be in English');
        return;
      }
      // Check for inappropriate language in the title and text fields
      const filter = new badWords();
      if (filter.isProfane(title)) {
        toast.error('Title contains inappropriate language');
        return;
      }
      if (filter.isProfane(text)) {
        toast.error('Text contains inappropriate language');
        return;
      }
      // Check that the title and text fields have at least 5 characters
      if (title.length < 5 || title.length > 30) {
        toast.error('The title must be at least 5 and no more than 30 characters');
        return;
      }
      if (text.length < 100 || text.length > 3000) {
        toast.error('The text must be at least 100 and no more than 600 characters');
        return;
      }

      dispatch(createPost(data));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="page__add-post add-post">
      <div className="add-post__container">
        <form className="add-post__form form-add-post" onSubmit={(e) => e.preventDefault()}>
          <label className="form-add-post__label button">
            Add image
            <input onChange={handleImageChange} type="file" hidden />
          </label>
          <div className="form-add-post__image">
            {image && <img src={URL.createObjectURL(image)} alt="ImagePost" />}
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
              className="form-add-post__button button button_green"
            >
              Add post
            </button>
            <Link to="/" className="form-add-post__button button button_red">
              Out
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
