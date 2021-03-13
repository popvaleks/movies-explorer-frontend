import React, { useEffect, useState, useReducer, useCallback } from 'react';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../../vendor/preloader/Preloader';

function MoviesCardList({
  errorServer, addCardOnScreen, cardOnPage, setSwitchBoxEnable,
  moviesCardList, notFound, prefix, savedCardList,
  handleChangeSave
}) {
  const [addOnPageAddButton, setAddOnPageAddButton] = useState(false);

  const handleClickAddButton = () => {
    addCardOnScreen()
  }

  useEffect(() => {
    if (moviesCardList.length > cardOnPage) {
      setAddOnPageAddButton(true)
    } else {
      setAddOnPageAddButton(false)
    }
  }, [cardOnPage, moviesCardList])

  return (
    <div className="movies-cardList__wrapper">
      {moviesCardList.length !== 0 && moviesCardList !== false
        ?
        <div>
          <div className="movies-cardList__content">
            {moviesCardList.map((item, index) => {
              if (index < cardOnPage) {
                return (
                  <MoviesCard
                    savedCardList={savedCardList}
                    card={item}
                    key={prefix === true ? item.id : item._id}
                    handleChangeSave={handleChangeSave}
                    setSwitchBox={setSwitchBoxEnable}
                  />)
              }
            })}
          </div>
          <div className="movies-cardList__more">
            {addOnPageAddButton &&
              <button onClick={handleClickAddButton} className="movies-cardList__more-button">
                <p className="movies-cardList__more-button-text">Еще</p>
              </button>}
          </div>
        </div>
        : notFound !== true
          ?
          <Preloader></Preloader>
          :
          <div className="movies-cardList__not-found">
            {errorServer
              ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
              : 'Ничего не найдено'
            }
          </div>
      }
    </div>
  );
}

export default MoviesCardList;
