import React, { useState, useCallback, useEffect } from 'react';
import {
  useHistory, Switch, Route, useLocation,
} from 'react-router-dom';

import './Footer.css';

function Footer() {
  const [footerHidden, setFooterHidden] = useState('block');

  const location = useLocation();

  const handleRouteCheck = useCallback(() => {
    (location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies') ? setFooterHidden('block') : setFooterHidden('none');
  }, [location.pathname]);

  React.useEffect(() => {
    handleRouteCheck();
  }, [handleRouteCheck]);

  return (
    <div div className="footer__wrapper" style={{ display: footerHidden }} >
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__contaner">
        <p className="footer__copyright">© 2020</p>
        <nav className="footer__navbar">
          <ul className="footer__navbar-list">
            <li className="footer__navbar-link">
              <a className="footer__link" href=" https://praktikum.yandex.ru/" target='_blank' rel="noreferrer">
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__navbar-link">
              <a className="footer__link" href=" https://github.com/popvaleks" target='_blank' rel="noreferrer">
                Github
              </a>
            </li>
            <li className="footer__navbar-link">
              <a className="footer__link" href="https://www.facebook.com/" target='_blank' rel="noreferrer">
                Facebook
              </a>
            </li>
          </ul>
        </nav>
      </div >
    </div>
  );
}

export default Footer;
