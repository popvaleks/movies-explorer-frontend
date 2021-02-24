import React from 'react';
import { Link } from 'react-scroll';

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
            <Link
              activeClass="active"
              to="section1"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="navtab__about-item-button">Технологии</Link>
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
