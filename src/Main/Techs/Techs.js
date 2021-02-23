import React from 'react';
import './Techs.css';

function techss() {
  return (
    <div className="techs__wrapper">
      <div className="tech__content">
        <h2 className="techs__tittle">Технологии</h2>
        <p className="techs__subtitle">7 технологий</p>
        <p className="techs__subtitle-text">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <nav className="techs__navbar">
          <ul className="techs__navbar-list">
            <li className="techs__navbar-navbar-item">
              <button type="button" className="techs__button">HTML</button>
            </li>
            <li className="techs__navbar-navbar-item">
              <button type="button" className="techs__button">CSS</button>
            </li>
            <li className="techs__navbar-navbar-item">
              <button type="button" className="techs__button">JS</button>
            </li>
            <li className="techs__navbar-navbar-item">
              <button type="button" className="techs__button">React</button>
            </li>
            <li className="techs__navbar-navbar-item">
              <button type="button" className="techs__button">Git</button>
            </li>
            <li className="techs__navbar-navbar-item">
              <button type="button" className="techs__button">Express.js</button>
            </li>
            <li className="techs__navbar-navbar-item">
              <button type="button" className="techs__button">MongoDB</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default techss;
