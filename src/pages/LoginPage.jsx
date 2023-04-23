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

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!/\S+@\S+\.\S+/.test(e.target.value)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!/(?=.*\d)(?=.*[a-zа-я])(?=.*[A-ZА-Я]).{6,}/.test(e.target.value)) {
      setPasswordError('Please enter a strong password');
    } else {
      setPasswordError('');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const fieldsValidation = (e) => {
    e.preventDefault();
    if (!emailError && !passwordError) {
      handleSubmit();
    } else {
      if (!email) {
        setEmailError('Please enter an email');
      }
      if (!password) {
        setPasswordError('Please enter a password');
      }
    }
  };

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
      dispatch(loginUser({ email, password }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page__login-page form-page">
      <div className="form-page__container">
        <form className="form-page__form" onSubmit={fieldsValidation}>
          <h1 className="form-page__title">Authorization</h1>

          <div className="form-page__item">
            {/* <div className="form-page__image">
              <img src="assets/noavatar.png" alt="ImagePost" />
            </div> */}
          </div>

          <div className="form-page__item">
            <label htmlFor="email" className="form-page__lable">
              Email:
              {emailError && <span className="form-page__error">{emailError}</span>}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={handleEmailChange}
              className={emailError ? 'form-page__input _error' : 'form-page__input'}
            />
          </div>

          <div className="form-page__item">
            <label htmlFor="password" className="form-page__lable">
              Password:
              {passwordError && <span className="form-page__error">{passwordError}</span>}
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className={passwordError ? 'form-page__input _error' : 'form-page__input'}
            />
            <button type="button" onClick={toggleShowPassword}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

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
