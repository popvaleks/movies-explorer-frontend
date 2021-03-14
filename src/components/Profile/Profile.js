import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Profile({ signOut }) {
  const history = useHistory();
  const currentUser = useContext(CurrentUserContext)
  const linkClick = (path) => {
    history.push(path)
  };

  const handleSignOut = () => {
    signOut()
  }

  const name = currentUser.name
  const email = currentUser.email

  return (
    <div className="profile__wrapper">
      <div className="profile__content">
        <h2 className="profile__header">Привет, {name}!</h2>
        <div className="profile__info">
          <div className="profile__info-block">
            <p className="profile__info-text">Имя</p>
            <p className="profile__info-text">{name}</p>
          </div>
          <div className="profile__info-block">
            <p className="profile__info-text">Почта</p>
            <p className="profile__info-text">{email}</p>
          </div>
        </div>
        <button onClick={() => linkClick('/edit-profile')} className="profile__button profile__edit">Редактировать</button>
        <button onClick={handleSignOut} className="profile__button profile__log-out">Выйти из аккаунта</button>
      </div>
    </div>
  )
}

export default Profile;
