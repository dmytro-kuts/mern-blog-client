import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Filter from 'bad-words';

import { checkIsAuth, registerUser } from '../redux/slices/auth/authSlice';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);

  const [image, setImage] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userNameError, setUserNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleNameChange = (e) => {
    const name = e.target.value;
    const filter = new Filter();
    setUserName(name);
    if (name === '') {
      setUserNameError('Please enter a name');
    } else if (!/^[a-zA-Z]+\s?[a-zA-Z]+$/.test(name)) {
      setUserNameError('Please enter a valid name');
    } else if (filter.isProfane(name)) {
      setUserNameError('Please enter a valid name');
    } else {
      setUserNameError('');
    }
  };

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
    if (!userNameError && !emailError && !passwordError) {
      handleSubmit();
    } else {
      if (!userName) {
        setUserNameError('Please enter a name');
      }
      if (!email) {
        setEmailError('Please enter an email');
      }
      if (!password) {
        setPasswordError('Please enter a password');
      }
    }
  };

  const handleSubmit = () => {
    try {
      const data = new FormData();
      data.append('userName', userName);
      data.append('email', email);
      data.append('password', password);
      data.append('image', image);
      dispatch(registerUser(data));

    } catch (error) {
      console.log(error);
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

  return (
    <div className="page__login-page form-page">
      <div className="form-page__container">
        <form className="form-page__form" onSubmit={fieldsValidation}>
          <h1 className="form-page__title">Register</h1>

          <div className="form-page__item">
            <div className="form-page__image">
              <img
                src={image ? URL.createObjectURL(image) : 'assets/noavatar.png'}
                alt="ImagePost"
              />
              <label className="form-page__add-img ">
                <input onChange={(e) => setImage(e.target.files[0])} type="file" hidden />
              </label>
            </div>
          </div>

          <div className="form-page__item">
            <label htmlFor="name" className="form-page__lable">
              Name:
              {userNameError && <span className="form-page__error">{userNameError}</span>}
            </label>
            <input
              id="name"
              type="text"
              value={userName}
              onChange={handleNameChange}
              placeholder="Name"
              className={userNameError ? 'form-page__input _error' : 'form-page__input'}
            />
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
              Register
            </button>
            <Link to="/login" className="form-page__button button">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
