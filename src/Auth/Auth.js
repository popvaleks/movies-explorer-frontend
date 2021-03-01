import React from 'react';
import {
  useHistory, Switch, Route, useLocation,
} from 'react-router-dom';

import './Auth.css';
import ico from '../images/logo.svg'

function Auth({
  title, nameField, btnText, subtitleText, subtitleLink, subtitleLinkRoute
}) {
  const history = useHistory();
  const linkClick = (path) => {
    history.push(path)
  };

  return (
    <div className="auth__wrapper">
      <button onClick={() => linkClick('/')} className="button auth__landing-btn">
        <img src={ico} alt="Дипломный проект" className="auth__img" />
      </button>
      <h2 className="auth__title">{title}</h2>
      <form action="" className="auth__form">
        <div className="auth__from-wrapper">
          {nameField &&
            <div className="auth__input-wrapper">
              <p className="auth__input-title">Имя</p>
              <input type="text" className="auth__input" required id="name" name="name" />
            </div>
          }
          <div className="auth__input-wrapper">
            <p className="auth__input-title">E-mail</p>
            <input type="text" className="auth__input" required id="email" name="email" />
          </div>
          <div className="auth__input-wrapper">
            <p className="auth__input-title">Пароль</p>
            <input type="password" className="auth__input  auth__subtitle-text_error" required id="password" name="password" />
            <span className="auth__input-error">Что-то пошло не так</span>
          </div>
        </div>
        <button className="button auth__button">{btnText}</button>
      </form>
      <div className="auth__subtitle-container">
        <p className="auth__subtitle-text">{subtitleText}</p>
        <a onClick={() => linkClick(subtitleLinkRoute)} className="link auth__subtitle-link">{subtitleLink}</a>
      </div>
    </div>
  )
}

export default Auth
