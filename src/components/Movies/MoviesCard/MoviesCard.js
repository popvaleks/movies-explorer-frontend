import React, { useState, useCallback } from 'react';
import {
  useLocation,
} from 'react-router-dom';

import './MoviesCard.css';

import unSaveImg from '../../../images/saveBDd.svg';
import saveImg from '../../../images/save9BE.svg';
import { likeMovies } from '../../../utils/MoviesApi'


function MoviesCard({ card, savedCardList }) {
  const [saved, setSaved] = useState(false);
  const [showCross, setShowCross] = useState('false');

  const location = useLocation();

  const handleRouteCheck = useCallback(() => {
    location.pathname === '/saved-movies' ? setShowCross(true) : setShowCross(false);
  }, [location.pathname]);

  React.useEffect(() => {
    handleRouteCheck();
  }, [handleRouteCheck]);

  const switchSaveIco = () => {
    likeMovies(card)
    console.log(card)
  }

  const handleSavedCheck = useCallback(() => {
    function isPositive(item) {
      return item.nameRU === card.nameRU;
    }
    savedCardList.some(isPositive)
      ? setSaved(true)
      : setSaved(false)
  }, [saved]);

  React.useEffect(() => {
    handleSavedCheck();
  }, []);

  return (
    <div className="moviesCard__wrapper">
      <div className="moviesCard__header">
        <div className="moviesCard__header-info">
          <h3 className="moviesCard__header-name">{card.nameRU}</h3>
          <p className="moviesCard__header-duration">{card.duration}</p>
        </div>
        {!showCross &&
          <button onClick={switchSaveIco} className="moviesCard__button moviesCard__button-save">
            <img alt='Фильмы' src={saved ? saveImg : unSaveImg} className="moviesCard__button-image"></img>
          </button>
        }
        {showCross &&
          <button className="moviesCard__button moviesCard__button-cross">
            <div className="moviesCard__button-cross-line"></div>
          </button>
        }
      </div>
      <div className="moviesCard__img-wrapper">
        <img alt='Фильмы' className="moviesCard__img" src={!showCross ? `https://api.nomoreparties.co${card.image.url}` : card.image}></img>
      </div>
    </div >
  );
}

export default MoviesCard;
