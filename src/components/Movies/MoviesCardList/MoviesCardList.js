import React, { useEffect, useState, useReducer, useCallback } from 'react';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../../vendor/preloader/Preloader';
import film1 from '../../../images/cardImg/tiny/film1.jpg';
import film2 from '../../../images/cardImg/tiny/film2.jpg';
import film3 from '../../../images/cardImg/tiny/film3.jpg';
import film4 from '../../../images/cardImg/tiny/film4.jpg';
import film5 from '../../../images/cardImg/tiny/film5.jpg';
import film6 from '../../../images/cardImg/tiny/film6.jpg';
import film7 from '../../../images/cardImg/tiny/film7.jpg';
import film8 from '../../../images/cardImg/tiny/film8.jpg';
import film9 from '../../../images/cardImg/tiny/film9.jpg';
import film10 from '../../../images/cardImg/tiny/film10.jpg';
import film11 from '../../../images/cardImg/tiny/film11.jpg';
import film12 from '../../../images/cardImg/tiny/film12.jpg';

import { getAllMovies } from '../../../utils/MoviesApi'


function MoviesCardList({ moviesCardList, notFound, prefix, savedCardList, switchSaveIco1 }) {
  // const [moviesCardList, setMoviesCardList] = useState([]);
  // const [notFound, setNotFound] = useState(false)

  // const findList = localStorage.getItem('searchList')

  // const handleGetmoviesCard = useCallback(() => {
  //   console.log(findList.length)
  //   debugger
  //   console.log(searchList.length)
  //   debugger
  //   findList.length !== 0
  //     ? setMoviesCardList(JSON.parse(findList))
  //     : setNotFound(true)
  //   console.log(searchList)
  //   debugger
  // }, [searchList])

  // useEffect(() => {
  //   handleGetmoviesCard()
  // }, [])

  // const findByName = (name) => {
  //   moviesCardList.forEach((item) => {
  //     if (item.includes(name) === true) {
  //       dispatch('increment')
  //       console.log(visibleCard)
  //     }
  //   })
  // }
  return (
    <div className="movies-cardList__wrapper">
      {moviesCardList.length !== 0
        ?
        <div>
          <div className="movies-cardList__content">
            {moviesCardList.map((item) => {
              return (
                <MoviesCard
                  savedCardList={savedCardList}
                  card={item}
                  key={prefix === true ? item.id : item._id}
                  switchSaveIco1={switchSaveIco1}
                />)
            })}
          </div>
          <div className="movies-cardList__more">
            <button onClick={() => console.log(moviesCardList[0].nameRU)} className="movies-cardList__more-button">
              <p className="movies-cardList__more-button-text">Еще</p>
            </button>
          </div>
        </div>
        : notFound !== true
          ?
          <Preloader></Preloader>
          :
          <div className="movies-cardList__not-found">
            {`К сожалению, ни чего не найдено (`}
          </div>
      }
    </div>
  );
}

export default MoviesCardList;
