import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio__wrapper">
      <h2 className="portfolio__title">Портфолио</h2>
      <a className="portfolio__link" href="!#">
        <p className="portfolio__link-text">Статичный сайт</p>
        <p className="portfolio__link-arrow">↗</p>
      </a>
      <a className="portfolio__link" href="!#">
        <p className="portfolio__link-text">Апаптивный сайт</p>
        <p className="portfolio__link-arrow">↗</p>
      </a>
      <a className="portfolio__link" href="!#">
        <p className="portfolio__link-text">Одностраничное приложение</p>
        <p className="portfolio__link-arrow">↗</p>
      </a>
    </div>
  );
}

export default Portfolio;
