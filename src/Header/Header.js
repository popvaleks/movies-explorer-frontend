import React from 'react';
import logo from '../images/logo.svg';
import './Header.css';
import buttonProfileImg from '../images/profileIco.svg'

function Header({ landingHeader }) {
  return (
    <header className="header">
      <div className="wrapper">
        <div className="header__header-static">
          <div className="header__logo">
            <a href="/" className="header__logo-link">
              <img src={logo} alt="Моя фильмотека" className="header__logo-pic"></img>
            </a>
          </div>
          {landingHeader &&
            <nav className="header__nav">
              <ul className="header__list">
                <li className="header__item">
                  <a href="!#" className="header__link">Регистрация</a>
                </li>
                <button type='button' className="header__button">Войти</button>
              </ul>
            </nav>
          }
          {!landingHeader &&
            <div className="header__movies">
              <nav className="header__nav">
                <ul className="header__list">
                  <li className="header__item">
                    <a href="!#" className="header__link">Главная</a>
                  </li>
                  <li className="header__item">
                    <a href="!#" className="header__link">Фильмы</a>
                  </li>
                  <li className="header__item">
                    <a href="!#" className="header__link">Сохраненные фильмы</a>
                  </li>
                </ul>
              </nav>
              <button type='button' className="header__button-profile">
                <p className="header__button-profile-text">Аккаунт</p>
                <div className="header__button-profile-wrapper">
                  <img src={buttonProfileImg} className="header__button-profile-img"></img>
                </div>
              </button>
            </div>
          }
        </div>
      </div>
    </header >
  );
}

export default Header;
