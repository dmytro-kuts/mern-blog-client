import React from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { checkIsAuth, logout } from '../redux/slices/auth/authSlice';
import { RootState, useAppDispatch } from '../redux/store';
import noAvatarPng from '../assets/noavatar.png';

const API_URL = import.meta.env.VITE_API_URL;

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = useSelector(checkIsAuth);

  const { user } = useSelector((state: RootState) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuLinkClick = () => {
    setIsMenuOpen(false);
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast('You are logged out');
    navigate('/');
  };

  return (
    <header className='header'>
      <div className={`header__container ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className='header__logo'>
          <div className='header__avatar'>
            {user?.avatarUrl ? (
              <img src={`${API_URL}/${user.avatarUrl}`} alt='ImagePost' />
            ) : (
              <img src={noAvatarPng} alt='ImagePost' />
            )}
          </div>
          <h3>{user?.userName}</h3>
        </div>

        {isAuth && (
          <div className='header__menu menu'>
            <nav className='menu__body'>
              <ul className='menu__list'>
                <li className='menu__item'>
                  <NavLink
                    to='/'
                    className='menu__link'
                    onClick={handleMenuLinkClick}
                  >
                    All posts
                  </NavLink>
                </li>
                <li className='menu__item'>
                  <NavLink
                    to='/posts'
                    className='menu__link'
                    onClick={handleMenuLinkClick}
                  >
                    My posts
                  </NavLink>
                </li>
                <li className='menu__item'>
                  <NavLink
                    to='/add'
                    className='menu__link'
                    onClick={handleMenuLinkClick}
                  >
                    Add post
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        )}

        <div className='header__actions'>
          {isAuth ? (
            <button onClick={logoutHandler} className='header__button button'>
              Log Out
            </button>
          ) : (
            <Link
              to={
                location.pathname === '/login' ||
                location.pathname === '/register'
                  ? '/'
                  : '/login'
              }
              className='header__button button'
            >
              {location.pathname === '/login' ||
              location.pathname === '/register'
                ? 'Back'
                : 'Log In'}
            </Link>
          )}
        </div>
        {isAuth && (
          <button
            type='button'
            className='menu__icon icon-menu'
            onClick={handleMenuToggle}
          >
            <span></span>
          </button>
        )}
      </div>
    </header>
  );
};
