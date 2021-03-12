import React, { useState, useCallback } from 'react';
import {
  useLocation,
} from 'react-router-dom';

import './MoviesCard.css';

import unSaveImg from '../../../images/saveBDd.svg';
import saveImg from '../../../images/save9BE.svg';
import { saveMovies } from '../../../utils/MoviesApi'
import { unsaveMovies } from '../../../utils/MoviesApi'


function MoviesCard({ card, savedCardList, handleChangeSave }) {
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
    handleChangeSave(card, saved)
    saved === true ? setSaved(false) : setSaved(true);
  }

  const removeCard = () => {
    handleChangeSave(card)
  }

  const handleSavedCheck = () => {
    if (savedCardList.message !== "Список фильмов отсутствует") {
      function isPositive(item) {
        return item.nameRU === card.nameRU;
      }
      savedCardList.some(isPositive)
        ? setSaved(true)
        : setSaved(false)
    }
  }

  React.useEffect(() => {
    if (location.pathname === '/movies') {
      handleSavedCheck(card);
    }
    handleSavedCheck()
  }, []);

  // const switchSaveIco = () => {
  //   saveMovies(card)
  //   console.log(card)
  // }

  // const switchSaveIco = () => {
  //   if (saved === true) {
  //     savedCardList.map((item) => {
  //       if (item.nameRU === card.nameRU) {
  //         unsaveMovies(item._id)
  //           .then(setSaved(false))
  //           .catch((err) => { console.log(err) })
  //       } else {
  //         return
  //       }
  //     })
  //   } else {
  //     saveMovies(card)
  //       .then(setSaved(true))
  //       .catch((err) => { console.log(err) })
  //   }
  // }


  // const handleSavedCheck = useCallback(() => {
  //   if (savedCardList.message !== "Список фильмов отсутствует") {
  //     function isPositive(item) {
  //       return item.nameRU === card.nameRU;
  //     }
  //     savedCardList.some(isPositive)
  //       ? setSaved(true)
  //       : setSaved(false)
  //   }
  // }, [saved]);

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
          <button onClick={removeCard} className="moviesCard__button moviesCard__button-cross">
            <div className="moviesCard__button-cross-line"></div>
          </button>
        }
      </div>
      <div className="moviesCard__img-wrapper">
        <img alt='Фильмы' className="moviesCard__img"
          src={
            !showCross
              ? (
                card.image !== null
                ? `https://api.nomoreparties.co${card.image.url}`
                : `https://api.nomoreparties.co/uploads/750x485_28d08c49c4.jpeg`)
              : card.image}>

        </img>
      </div>
    </div >
  );
}

export default MoviesCard;
