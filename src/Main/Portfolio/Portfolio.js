import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio__wrapper">
      <h2 className="portfolio__title">Портфолио</h2>
      <a className="portfolio__link" href="https://github.com/popvaleks/russian-travel" target='_blank' rel="noreferrer">
        <p className="portfolio__link-text">Статичный сайт</p>
        <p className="portfolio__link-arrow">↗</p>
      </a>
      <a className="portfolio__link" href="https://github.com/popvaleks/react-mesto-api-full" target='_blank' rel="noreferrer">
        <p className="portfolio__link-text">Адаптивный сайт</p>
        <p className="portfolio__link-arrow">↗</p>
      </a>
      <a className="portfolio__link" href="https://github.com/popvaleks/mesto" target='_blank' rel="noreferrer">
        <p className="portfolio__link-text">Одностраничное приложение</p>
        <p className="portfolio__link-arrow">↗</p>
      </a>
    </div>
  );
}

export default Portfolio;
