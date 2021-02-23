import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="footer__wrapper">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__contaner">
        <p className="footer__copyright">© 2020</p>
        <nav className="footer__navbar">
          <ul className="footer__navbar-list">
            <li className="footer__navbar-link">Яндекс.Практикум</li>
            <li className="footer__navbar-link">Github</li>
            <li className="footer__navbar-link">Facebook</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Footer;
