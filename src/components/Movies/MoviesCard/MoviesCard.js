import React, { useState, useCallback } from 'react';
import {
  useLocation,
} from 'react-router-dom';

import './MoviesCard.css';

import unSaveImg from '../../../images/saveBDd.svg';
import saveImg from '../../../images/save9BE.svg';


function MoviesCard({ cardName, cardDuration, cardImg }) {
  const [saved, setSaved] = useState(false);
  const [showCross, setShowCross] = useState('false');

  const location = useLocation();

  const handleRouteCheck = useCallback(() => {
    location.pathname === '/saved-movies' ? setShowCross(true) : setShowCross(false);
  }, [location.pathname]);

  React.useEffect(() => {
    handleRouteCheck();
  }, [handleRouteCheck]);

  const switchSaveIco = () => saved === false ? setSaved(true) : setSaved(false);

  const removeCard = () => console.log('card removed')

  return (
    <div className="moviesCard__wrapper">
      <div className="moviesCard__header">
        <div className="moviesCard__header-info">
          <h3 className="moviesCard__header-name">{cardName}</h3>
          <p className="moviesCard__header-duration">{cardDuration}</p>
        </div>
        {!showCross &&
          <button onClick={switchSaveIco} className="moviesCard__button moviesCard__button-save">
            <img alt='Фильмы' src={saved ? saveImg : unSaveImg} className="moviesCard__button-image"></img>
          </button>
        }
        {showCross &&
          <button onClick={removeCard} className="moviesCard__button moviesCard__button-cross">
            <div className="moviesCard__button-cross-line"></div>
          </button>
        }
      </div>
      <div className="moviesCard__img-wrapper">
        <img alt='Фильмы' className="moviesCard__img" src={cardImg}></img>
      </div>
    </div >
  );
}

export default MoviesCard;
