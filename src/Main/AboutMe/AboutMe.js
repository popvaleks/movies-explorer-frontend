import React from 'react';
import './AboutMe.css';
import avatar from '../../images/pic__COLOR_pic.jpg';

function AboutMe() {
  return (
    <div id="aboutMe" className="about-me__wrapper">
      <h2  className="about-me__tittle">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__block">
          <p className="about-me__subtitle">Александр</p>
          <p className="about-me__job">Фронтенд-разработчик, 26 лет</p>
          <p className="about-me__subtitle-text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года
            работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
            начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
        </div>
        <img className="about-me__img" src={avatar}></img>
      </div>
      <nav className="about-me__navbar">
        <ul className="about-me__navbar-list">
          <li className="about-me__navbar-navbar-item">
            <a href="https://www.facebook.com/" target='_blank' rel="noreferrer" className="about-me__link">Facebook</a>
          </li>
          <li className="about-me__navbar-navbar-item">
            <a href="https://github.com/popvaleks" target='_blank' rel="noreferrer" className="about-me__link">Github</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AboutMe;
