import React, { useState, useCallback, useEffect } from 'react';
import {
  useHistory, useLocation,
} from 'react-router-dom';

import './Header.css';
import logo from '../../images/logo.svg';
import buttonProfileImg from '../../images/profileIco.svg';

function Header({ landingHeader, loggedIn }) {
  const [menuStatus, setMenuStatus] = useState('hidden');
  const [headerOn, setHeaderOn] = useState(true);

  const history = useHistory();
  const location = useLocation();

  const hadleMenuHiddenOnClickLink = () => {
    if (menuStatus !== 'hidden') {
      setMenuStatus('hidden')
      scrollPage(false)
    }
  }

  const linkClick = (path, e) => {
    e.preventDefault();
    hadleMenuHiddenOnClickLink()
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

  return (
    <header className={`header ${!headerOn && 'header__hidden'}`}>
      <div className="wrapper">
        <div className="header__header-static">
          <div className="header__logo">
            <a href="" onClick={(e) => linkClick('/', e)} className="header__logo-link">
              <img src={logo} alt="Моя фильмотека" className="header__logo-pic"></img>
            </a>
          </div>
          {landingHeader && !loggedIn &&
            <nav className="header__nav">
              <ul className="header__list">
                <li className="header__item">
                  <a href="" onClick={(e) => linkClick('/sign-up', e)} className="link header__link">Регистрация</a>
                </li>
                <button type='button' onClick={(e) => linkClick('/sign-in', e)} className="button header__button">Войти</button>
              </ul>
            </nav>
          }
          {loggedIn &&
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
                        <a href="" onClick={(e) => linkClick('/', e)} className="link_movies header__link_mobile">Главная</a>
                      </li>
                      <li className="header__item">
                        <a href="" onClick={(e) => linkClick('movies', e)} className="link_movies header__link-movies">Фильмы</a>
                      </li>
                      <li className="header__item">
                        <a href="" onClick={(e) => linkClick('saved-movies', e)} className="link_movies header__link-saved">Сохранённые фильмы</a>
                      </li>
                    </ul>
                  </nav>
                  <button onClick={(e) => linkClick('profile', e)} type='button' className="header__button-profile header__button-profile-text">
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
