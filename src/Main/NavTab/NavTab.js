import React from 'react';
import './NavTab.css';

function NavTab() {
  return (
    <div className="navtab__wrapper">
      <nav className="navtab__about-nav">
        <ul className="navtab__about-navbar">
          <li className="navtab__about-navbar-item">
            <button type="navtab__about" className="navtab__about-item-button">О проекте</button>
          </li>
          <li className="navtab__about-navbar-item">
            <button type="button" className="navtab__about-item-button">Технологии</button>
          </li>
          <li className="navtab__about-navbar-item">
            <button type="button" className="navtab__about-item-button">Студент</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavTab;
