import React from 'react';
import logo from '../images/logo.svg';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="wrapper">
        <div className="header__header-static">
          <div className="header__logo">
            <a href="/" className="header__logo-link">
              <img src={logo} alt="Моя фильмотека" className="header__logo-pic"></img>
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__list">
              <li className="header__item">
                <a href="!#" className="header__link">Регистрация</a>
              </li>
              <button type='button' className="header__button">Войти</button>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
