import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { checkIsAuth, logout } from '../redux/slices/auth/authSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast('You are logged out');
  };

  return (
    <header>
      <div className="header__container">
        <span className="header__logo">D</span>

        {isAuth && (
          <div className="header__menu menu">
            <nav className="menu__body">
              <ul className="menu__list">
                <li className="menu__item">
                  <NavLink to="/" className="menu__link">
                    Home
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
