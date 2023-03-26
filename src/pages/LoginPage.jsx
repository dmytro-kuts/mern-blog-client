import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { checkIsAuth, loginUser } from '../redux/slices/auth/authSlice';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    if (status) {
      toast(status);
    }
    if (isAuth) {
      navigate('/');
    }
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ userName, password }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page__login-page form-page">
      <div className="form-page__container">
        <Link to={'/'} className="post-page__button button">
          Back
        </Link>
        <form className="form-page__form" onSubmit={(e) => e.preventDefault()}>
          <h1 className="form-page__title">Authorization</h1>
          <label className="form-page__lable">
            Name:
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Name"
              className="form-page__input"
            />
          </label>
          <label className="form-page__lable">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" Password"
              className="form-page__input"
            />
          </label>
          <div className="form-page__actions">
            <button type="submit" onClick={handleSubmit} className="form-page__button button">
              Log In
            </button>
            <Link to="/register" className="form-page__button button">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
