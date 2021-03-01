import React, { useState, useCallback } from 'react';
import {
  useLocation,
} from 'react-router-dom';

import './MoviesCard.css';

import unSaveImg from '../../images/saveBDd.svg';
import saveImg from '../../images/save9BE.svg';


function MoviesCard({ cardName, cardDuration, cardImg }) {
  const [unSaveIcon, setUnSaveIcon] = useState('block')
  const [saveIcon, setSaveIcon] = useState('none');
  const [showCross, setShowCross] = useState('false');

  const location = useLocation();

  const handleRouteCheck = useCallback(() => {
    location.pathname === '/saved-movies' ? setShowCross(true) : setShowCross(false);
  }, [location.pathname]);

  React.useEffect(() => {
    handleRouteCheck();
  }, [handleRouteCheck]);

  const disbleIco = () => {
    setSaveIcon('none')
    setUnSaveIcon('block')
  }
  const enableIco = () => {
    setSaveIcon('block')
    setUnSaveIcon('none')
  }
  const switchSaveIco = () => saveIcon === 'block' ? disbleIco() : enableIco();

  return (
    <div className="moviesCard__wrapper">
      <div className="moviesCard__header">
        <div className="moviesCard__header-info">
          <h3 className="moviesCard__header-name">{cardName}</h3>
          <p className="moviesCard__header-duration">{cardDuration}</p>
        </div>
        {!showCross &&
          <button onClick={switchSaveIco} className="moviesCard__button moviesCard__button-save">
            <img src={unSaveImg} className="moviesCard__button-image" style={{ display: unSaveIcon }}></img>
            <img src={saveImg} className="moviesCard__button-image" style={{ display: saveIcon }}></img>
          </button>
        }
        {showCross &&
          <button onClick='#' className="moviesCard__button moviesCard__button-cross">
            <div className="moviesCard__button-cross-line"></div>
          </button>
        }
      </div>
      <div className="moviesCard__img-wrapper">
        <img className="moviesCard__img" src={cardImg}></img>
      </div>
    </div >
  );
}

export default MoviesCard;
