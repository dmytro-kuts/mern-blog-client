import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <div className="header__container">
        <span className="header__logo">D</span>
        <div className="header__menu menu">
          <nav className="menu__body">
            <ul className="menu__list">
              <li className="menu__item">
                <NavLink to="/" className="menu__link">
                  Головна
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink to="/posts" className="menu__link">
                  Мої пости
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink to="/add" className="menu__link">
                  Додати пост
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header__actions">
          <Link to="" className="header__button button">
            Увійти
          </Link>
        </div>
      </div>
    </header>
  );
};
