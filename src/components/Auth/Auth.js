import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import './Auth.css';
import ico from '../../images/logo.svg';
import * as auth from '../../utils/MainApi';
import errorHandler from '../../helpers/errorHandler';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Auth({
  title, upDateUserInfo, nameField, btnText, subtitleText,
  subtitleLink, subtitleLinkRoute, setLoggedIn, passField,
  editProfile,
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
  const currentUser = useContext(CurrentUserContext)

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
      if (emailError || passwordError || nameError || password === ''
        || emailInput === '' || nameInput === '') {
        setFormValid(false)
      } else {
        setFormValid(true)
        setReqError('')
      }
    } else if (location.pathname === '/sign-in') {
      if (emailError || passwordError || emailInput === '' || password === '') {
        setFormValid(false)
      } else {
        setFormValid(true)
        setReqError('')
      }
    } else {
      if (nameInput === '') {
        setReqError('')
        setNameError('')
      }
      if (emailInput === '') {
        setReqError('')
        setEmailError('')
      }
      if (nameInput === '' && emailInput === '' || emailError || nameError) {
        setFormValid(false)
      } else if (nameInput === currentUser.name || emailInput === currentUser.email) {
        setReqError('Введите новые значения')
        setFormValid(false)
      } else {
        setReqError('')
        setFormValid(true)
      }
    }
  }, [nameInput, emailInput, password])

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

  const loginUp = (emailInput, password) => {
    auth.authorize(emailInput, password)
      .then((data) => {
        resetForm();
        setLoggedIn(true);
        history.push('/movies');
        upDateUserInfo();
      })
      .catch((err) => {
        setReqError(errorHandler(err.code));
        setPassword('');
        setFormValid(false);
        setPasswordDirty(false);
      })
  }

  const regUpAndLogin = (emailInput, password, nameInput) => {
    auth.register(emailInput, password, nameInput)
      .then((data) => {
        setPassword('');
        setNameInput('');
        loginUp(emailInput, password)
      })
      .catch((err) => {
        setReqError(errorHandler(err.code));
        setPassword('');
        setFormValid(false);
        setPasswordDirty(false);
      })
  }

  const changeProfileInfo = (emailInput, nameInput) => {
    auth.editProfile(emailInput, nameInput)
      .then(() => {
        setReqError('Сохранено!');
        setFormValid(false);
        return new Promise(function (resolve, reject) {
          setTimeout(() => {
            resetForm();
            upDateUserInfo();
            history.push('/profile');
            resolve();
          }, 1000)
        });
      })
      .catch((err) => {
        setReqError(errorHandler(err.code));
        setFormValid(false);
      })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    location.pathname === '/sign-in'
      ? loginUp(emailInput, password)
      : location.pathname === '/edit-profile'
        ? changeProfileInfo(emailInput, nameInput)
        : regUpAndLogin(emailInput, password, nameInput)
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
              <input onChange={handleNameChange} onBlur={blurHandler} value={nameInput} placeholder={editProfile && currentUser.name}
                type="text" className={`auth__input ${nameDirty && nameError && "auth__subtitle-text_error"}`} required={editProfile ? false : true} id="name" name="name" />
              {(nameDirty && nameError) &&
                <span className="auth__input-error">{nameError}</span>}
            </div>
          }
          {/* Email */}
          <div className="auth__input-wrapper">
            <p className="auth__input-title">E-mail</p>
            <input value={emailInput} onChange={handleEmailChange} onBlur={blurHandler} placeholder={editProfile && currentUser.email}
              type="text" className={`auth__input ${emailDirty && emailError && "auth__subtitle-text_error"}`} required={editProfile ? false : true} id="email" name="email" />
            {(emailDirty && emailError) &&
              <span className="auth__input-error">{emailError}</span>}
          </div>
          {/* Pass */}
          {passField &&
            <div className="auth__input-wrapper">
              <p className="auth__input-title">Пароль</p>
              <input value={password} onChange={handlePasswordChange} onBlur={blurHandler}
                type="password" className={`auth__input ${passwordDirty && passwordError && "auth__subtitle-text_error"}`} required id="password" name="password" />
              {(passwordDirty && passwordError) &&
                <span className="auth__input-error">{passwordError}</span>}
            </div>}
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
