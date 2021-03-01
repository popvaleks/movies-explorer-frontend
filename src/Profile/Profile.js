import React from 'react';

import './Profile.css';

function Profile() {
  const name = 'Виталий';
  const email = 'pochta@yandex.ru'
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
        <button className="profile__button profile__edit">Редактировать</button>
        <button className="profile__button profile__log-out">Выйти из аккаунта</button>
      </div>

    </div>
  )
}

export default Profile;
