import React, { useState, useCallback } from 'react';
import {
  useHistory, Switch, Route, useLocation,
} from 'react-router-dom';

import './Header.css';
import logo from '../../images/logo.svg';
import buttonProfileImg from '../../images/profileIco.svg';
import { removeCookie } from '../../utils/cookieHandler';
import * as auth from '../../utils/MainApi';

function Header({ landingHeader, loggedIn, setLoggedIn, }) {
  const [menuStatus, setMenuStatus] = useState('hidden')
  const [headerOn, setHeaderOn] = useState(true)

  const history = useHistory();
  const location = useLocation();

  const linkClick = (path) => {
    history.push(path)
  };
  const scrollPage = (condition) => {
    condition === true ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'
  };
  const menuSwap = () => {
    menuStatus === 'hidden'
      ? (setMenuStatus(''), scrollPage(true))
      : (setMenuStatus('hidden'), scrollPage(false))
  }

  const handleRouteCheck = useCallback(() => {
    (location.pathname === '/'
      || location.pathname === '/movies'
      || location.pathname === '/saved-movies'
      || location.pathname === '/profile'
    ) ? setHeaderOn(true) : setHeaderOn(false);
  }, [location.pathname]);

  React.useEffect(() => {
    handleRouteCheck();
  }, [handleRouteCheck]);

  const handleSignOut = () => {
    removeCookie('jwt');
    auth.signOut();
    setLoggedIn(false);
    history.push('/')
  }

  return (
    <header className={`header ${!headerOn && 'header__hidden'}`}>
      <div className="wrapper">
        <div className="header__header-static">
          <div className="header__logo">
            <a href="" onClick={() => linkClick('/')} className="header__logo-link">
              <img src={logo} alt="Моя фильмотека" className="header__logo-pic"></img>
            </a>
          </div>
          {landingHeader && !loggedIn &&
            <nav className="header__nav">
              <ul className="header__list">
                <li className="header__item">
                  <a href="" onClick={() => linkClick('/sign-up')} className="link header__link">Регистрация</a>
                </li>
                <button type='button' onClick={() => linkClick('/sign-in')} className="button header__button">Войти</button>
              </ul>
            </nav>
          }
          {landingHeader && loggedIn &&
            <nav className="header__nav">
              <ul className="header__list">
                <li className="header__item">
                  <a href="" onClick={() => linkClick('/movies')} className="link header__link">Фильмы</a>
                </li>
                <button type='button' onClick={handleSignOut} className="button header__button">Выйти</button>
              </ul>
            </nav>
          }
          {!landingHeader &&
            <div className="header__menu">
              <div onClick={menuSwap} className="menu-burger__header">
                <span></span>
              </div>
              <div className="overflow">
                <div className={`menu-burger__bcg ${menuStatus}`}></div>
                <div className={`header__movies ${menuStatus}`}>
                  <nav className="header__nav header__nav_movies">
                    <ul className="header__list header__list_movies">
                      <li className="header__item header__item_movies">
                        <a href="" onClick={() => linkClick('/')} className="link_movies header__link_mobile">Главная</a>
                      </li>
                      <li className="header__item">
                        <a href="" onClick={() => linkClick('movies')} className="link_movies header__link-movies">Фильмы</a>
                      </li>
                      <li className="header__item">
                        <a href="" onClick={() => linkClick('saved-movies')} className="link_movies header__link-saved">Сохранённые фильмы</a>
                      </li>
                    </ul>
                  </nav>
                  <button onClick={() => linkClick('profile')} type='button' className="header__button-profile header__button-profile-text">
                    Аккаунт
                    <div className="header__button-profile-wrapper">
                      <img src={buttonProfileImg} alt='Дипломный проект' className="header__button-profile-img"></img>
                    </div>
                  </button>
                  <button onClick={menuSwap} className={`header__button-cross ${menuStatus}`}>
                    <div className="header__button-cross-line"></div>
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </header >
  );
}

export default Header;
