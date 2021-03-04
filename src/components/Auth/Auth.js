import React, { useState } from 'react';
import {
  useHistory, Switch, Route, useLocation,
} from 'react-router-dom';

import './Auth.css';
import ico from '../../images/logo.svg';
import * as auth from '../../utils/MainApi';
import errorHandler from '../../helpers/errorHandler'

function Auth({
  title, nameField, btnText, subtitleText, subtitleLink, subtitleLinkRoute
}) {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('Поле не может быть пустым');
  const [nameDirty, setNameDirty] = useState(false);
  const [emailError, setEmailError] = useState('Поле не может быть пустым');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordError, setPasswordError] = useState('Поле не может быть пустым');
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [reqError, setReqError] = useState('');

  const history = useHistory();

  const handleEmailChange = (evt) => {
    setEmailInput(evt.target.value)
    const re = /([a-zA-Z0-9]([-_.]?[a-zA-Z0-9]+)*)@([a-zA-Z0-9]([-]?[a-zA-Z0-9]+)*)(\.([a-zA-Z])+)+/i
    if (!re.test(String(evt.target.value).toLowerCase())) {
      setEmailError('Не корректный Email')
    } else {
      setEmailError('')
    }
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value)
    if (evt.target.value.length < 8) {
      setPasswordError('Пароль должен содержать минимум 8 символов')
      if (!evt.target.value) {
        setPasswordError('Введите пароль')
      }
    } else {
      setPasswordError('')
    }
  }

  const handleNameChange = (evt) => {
    setNameInput(evt.target.value)
    const re = /(^[a-zA-Z\s-]+$)+/i
    if (evt.target.value.length < 2) {
      setNameError('Поле должно содержать минимум 2 символа')
      if (!evt.target.value) {
        setNameError('Введите имя')
      }
    } else if (!re.test(String(evt.target.value))) {
      return setNameError('Поле должно содержать только латиницу, пробел или дефис')
    } else {
      setNameError('')
    }
  }

  const blurHandler = (evt) => {
    switch (evt.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
      case 'name':
        setNameDirty(true)
    }
  }

  React.useEffect(() => {
    if (location.pathname === '/sign-up') {
      if (emailError || passwordError || nameError) {
        setFormValid(false)
      } else {
        setFormValid(true)
        setReqError('')
      }
    } else {
      if (emailError || passwordError) {
        setFormValid(false)
      } else {
        setFormValid(true)
        setReqError('')
      }
    }
  }, [emailError, passwordError, nameError])

  const resetForm = () => {
    setEmailInput('');
    setPassword('');
    setNameInput('');
    setReqError('');
    setNameError('Поле не может быть пустым');
    setEmailError('Поле не может быть пустым');
    setPasswordError('Поле не может быть пустым');
    setNameDirty(false);
    setEmailDirty(false);
    setPasswordDirty(false);
    setFormValid(false);
  }

  const linkClick = (path) => {
    resetForm();
    history.push(path);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault()
    location.pathname === '/sign-in'
      ? auth.authorize(emailInput, password)
        .then((data) => {
          resetForm();
          history.push('/');
        })
        .catch((err) => {
          setReqError(errorHandler(err.code));
          setPassword('');
          setFormValid(false);
          setPasswordDirty(false);
        })
      : auth.register(emailInput, password, nameInput)
        .then((data) => {
          setPassword('');
          setNameInput('');
          history.push('/sign-in');
        })
        .catch((err) => {
          setReqError(errorHandler(err.code));
          setPassword('');
          setFormValid(false);
          setPasswordDirty(false);
        })
  }

  return (
    <div className="auth__wrapper">
      <button type="button" onClick={() => linkClick('/')} className="button auth__landing-btn">
        <img src={ico} alt="Дипломный проект" className="auth__img" />
      </button>
      <h2 className="auth__title">{title}</h2>
      <form onSubmit={handleSubmit} className="auth__form">
        <div className="auth__from-wrapper">
          {/* Name */}
          {nameField &&
            <div className="auth__input-wrapper">
              <p className="auth__input-title">Имя</p>
              <input onChange={handleNameChange} onBlur={blurHandler} value={nameInput}
                type="text" className={`auth__input ${nameDirty && nameError && "auth__subtitle-text_error"}`} required id="name" name="name" />
              {(nameDirty && nameError) &&
                <span className="auth__input-error">{nameError}</span>}
            </div>
          }
          {/* Email */}
          <div className="auth__input-wrapper">
            <p className="auth__input-title">E-mail</p>
            <input value={emailInput} onChange={handleEmailChange} onBlur={blurHandler}
              type="text" className={`auth__input ${emailDirty && emailError && "auth__subtitle-text_error"}`} required id="email" name="email" />
            {(emailDirty && emailError) &&
              <span className="auth__input-error">{emailError}</span>}
          </div>
          {/* Pass */}
          <div className="auth__input-wrapper">
            <p className="auth__input-title">Пароль</p>
            <input value={password} onChange={handlePasswordChange} onBlur={blurHandler}
              type="password" className={`auth__input ${passwordDirty && passwordError && "auth__subtitle-text_error"}`} required id="password" name="password" />
            {(passwordDirty && passwordError) &&
              <span className="auth__input-error">{passwordError}</span>}
          </div>
        </div>
        {(reqError !== '') &&
          <span className="auth__req-error">{reqError}</span>}
        <button onSubmit={handleSubmit} type="submit" disabled={!formValid}
          className={`button auth__button ${!formValid && "auth__button_disabled"}`}>
          {btnText}
        </button>
      </form>
      <div className="auth__subtitle-container">
        <p className="auth__subtitle-text">{subtitleText}</p>
        <a onClick={() => linkClick(subtitleLinkRoute)} className="link auth__subtitle-link">{subtitleLink}</a>
      </div>
    </div>
  )
}

export default Auth
