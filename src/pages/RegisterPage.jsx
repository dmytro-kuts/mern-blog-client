import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/auth/authSlice';
import { toast } from 'react-toastify';




export const RegisterPage = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    if (status) {
      toast(status)
    }
  }, [status]);

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ userName, password }));
      setUserName('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page__login-page form-page">
      <div className="form-page__container">
        <form className="form-page__form" onSubmit={(e) => e.preventDefault()}>
          <h1 className="form-page__title">Register</h1>
          <label className="form-page__lable">
            Name:
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Name"
              className={status && status.error ? 'form-page__input _error' : 'form-page__input'}
            />
            {status && status.error && <div className="form-page__error">{status.error}</div>}
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
