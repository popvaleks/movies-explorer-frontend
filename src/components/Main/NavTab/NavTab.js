import React from 'react';

import './NavTab.css';

function NavTab() {
  return (
    <div className="navtab__wrapper">
      <nav className="navtab__about-nav">
        <ul className="navtab__about-navbar">
          <li className="navtab__about-navbar-item">
            <a href="#aboutProject" className="navtab__about-item-link">
              <button type="button" className="navtab__about-item-button">О проекте</button>
            </a>
          </li>
          <li className="navtab__about-navbar-item">
            <a href="#techs" className="navtab__about-item-link">
              <button type="button" className="navtab__about-item-button">Технологии</button>
            </a>
          </li>
          <li className="navtab__about-navbar-item">
            <a href="#aboutMe" className="navtab__about-item-link">
              <button type="button" className="navtab__about-item-button">Студент</button>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavTab;
