import React from 'react';
import { Link, Params, useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import { updatePost } from '../redux/slices/post/postSlice';
import axios from '../utils/axios';
import { useAppDispatch } from '../redux/store';

const API_URL = import.meta.env.VITE_API_URL;

export const EditPostPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params: Readonly<Params<string>> = useParams();

  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');
  const [oldImage, setOldImage] = React.useState('');
  const [newImage, setNewImage] = React.useState<File | null>(null);

  const handlerSubmit = () => {
    try {
      if (params.id) {
        const dataUpdate: FormData = new FormData();
        dataUpdate.append('title', title);
        dataUpdate.append('text', text);

        dataUpdate.append('id', params.id);

        if (newImage) {
          dataUpdate.append('image', newImage);
        }
        dispatch(updatePost(dataUpdate));
        toast.success('The post has been updated');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPost = React.useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${params.id}`);
      setTitle(data.title);
      setText(data.text);
      setOldImage(data.imgUrl);
    } catch (error) {
      console.error(error);
    }
  }, [params.id]);

  React.useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <div className='page__add-post add-post'>
      <div className='add-post__container'>
        <form
          className='add-post__form form-add-post'
          onSubmit={(e) => e.preventDefault()}
        >
          <label className='form-add-post__label button'>
            Add image
            <input
              type='file'
              hidden
              onChange={(e) => {
                if (e.target.files) {
                  setNewImage(e.target.files[0]);
                  setOldImage('');
                }
              }}
            />
          </label>
          <div className='form-add-post__image'>
            {oldImage && <img src={`${API_URL}/${oldImage}`} alt='ImagePost' />}
            {newImage && (
              <img src={URL.createObjectURL(newImage)} alt='ImagePost' />
            )}
          </div>

          <label className='form-add-post__label'>
            Title post:
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='form-add-post__input'
            />
          </label>

          <label className='form-add-post__label'>
            Text post:
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className='form-add-post__input form-add-post__input_text'
            />
          </label>

          <div className='form-add-post__actions'>
            <button
              onClick={handlerSubmit}
              type='submit'
              className='form-add-post__button button button_green'
            >
              Update post
            </button>
            <Link to='/' className='form-add-post__button button button_red'>
              Out
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
