import React from 'react';
import './Techs.css';

function techss() {
  return (
    <div id="techs" className="techs__wrapper">
      <div className="tech__content">
        <h2 className="techs__tittle">Технологии</h2>
        <p className="techs__subtitle">7 технологий</p>
        <p className="techs__subtitle-text">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <nav className="techs__navbar">
          <ul className="techs__navbar-list">
            <li className="techs__navbar-navbar-item">
              <a href="https://www.w3schools.com/html/html_editors.asp" target='_blank' rel="noreferrer">
                <button type="button" className="techs__button">HTML</button>
              </a>
            </li>
            <li className="techs__navbar-navbar-item">
              <a href="https://www.w3schools.com/css/default.asp" target='_blank' rel="noreferrer">
                <button type="button" className="techs__button">CSS</button>
              </a>
            </li>
            <li className="techs__navbar-navbar-item">
              <a href="https://learn.javascript.ru/" target='_blank' rel="noreferrer">
                <button type="button" className="techs__button">JS</button>
              </a>
            </li>
            <li className="techs__navbar-navbar-item">
              <a href="https://reactjs.org/" target='_blank' rel="noreferrer">
                <button type="button" className="techs__button">React</button>
              </a>
            </li>
            <li className="techs__navbar-navbar-item">
              <a href="https://git-scm.com/" target='_blank' rel="noreferrer">
                <button type="button" className="techs__button">Git</button>
              </a>
            </li>
            <li className="techs__navbar-navbar-item">
              <a href="https://developer.mozilla.org/ru/docs/Learn/Server-side/Express_Nodejs" target='_blank' rel="noreferrer">
                <button type="button" className="techs__button">Express.js</button>
              </a>
            </li>
            <li className="techs__navbar-navbar-item">
              <a href="https://www.mongodb.com/" target='_blank' rel="noreferrer">
                <button type="button" className="techs__button">MongoDB</button>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default techss;
