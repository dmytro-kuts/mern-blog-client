import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { checkIsAuth, logout } from '../redux/slices/auth/authSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);

  const { user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast('You are logged out');
    navigate('/');
  };

  return (
    <header>
      <div className="header__container">
        <div className="header__logo">
          <div className="header__avatar">
            {user?.avatarUrl ? (
              <img
                src={`http://localhost:4444/${user.avatarUrl}`}
                alt="ImagePost"
              />
            ) : (
              <img
                src='assets/noavatar.png'
                alt="ImagePost"
              />
            )}
          </div>
          <h3>{user?.userName}</h3>
        </div>

        {isAuth && (
          <div className="header__menu menu">
            <nav className="menu__body">
              <ul className="menu__list">
                <li className="menu__item">
                  <NavLink to="/" className="menu__link">
                    All posts
                  </NavLink>
                </li>
                <li className="menu__item">
                  <NavLink to="/posts" className="menu__link">
                    My posts
                  </NavLink>
                </li>
                <li className="menu__item">
                  <NavLink to="/add" className="menu__link">
                    Add post
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        )}

        <div className="header__actions">
          {isAuth ? (
            <button onClick={logoutHandler} className="header__button button">
              Log Out
            </button>
          ) : (
            <Link to="/login" className="header__button button">
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
