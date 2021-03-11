import React, { useEffect, useState, useReducer, useCallback } from 'react';

import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { getMyMovies } from '../../utils/MoviesApi';
import { saveMovies } from '../..//utils/MoviesApi'
import { unsaveMovies } from '../../utils/MoviesApi'

function Movies({ }) {
  const [searchList, setSearchList] = useState([])
  const [moviesCardList, setMoviesCardList] = useState([]);
  const [notFound, setNotFound] = useState(false)
  const [savedCardList, setSavedCardList] = useState([])

  const refreshMovies = () => {
    getMyMovies()
      .then((cards) => {
        cards.message === 'Список фильмов отсутствует'
          ? setSavedCardList(cards)
          : setSavedCardList(cards)
      })
      .catch((err) => { console.log(err) })
  }

  const handleGetSavedsCard = useCallback(() => {
    refreshMovies()
  }, [savedCardList])

  useEffect(() => {
    handleGetSavedsCard()
  }, [])

  const updateSearchList = (content) => {
    setSearchList(content)
  }

  const findList = localStorage.getItem('searchList')

  const handleGetmoviesCard = useCallback(() => {
    findList.length !== 0
      ? setMoviesCardList(JSON.parse(findList))
      : (setMoviesCardList([]),
        setNotFound(true))
  }, [searchList])

  useEffect(() => {
    handleGetmoviesCard()
  }, [searchList])

  const switchSaveIco = (card, saved) => {
    if (saved === true) {
      savedCardList.map((item) => {
        if (item.nameRU === card.nameRU) {
          unsaveMovies(item._id)
            .then(() => {
              refreshMovies()
            })
            .catch((err) => { console.log(err) })
        } else {
          return
        }
      })
    } else {
      saveMovies(card)
        .then(() => {
          refreshMovies()
        })
        .catch((err) => { console.log(err) })
    }
  }

  return (
    <div className="movies__wrapper">
      <SearchForm
        updateSearchList={updateSearchList}
      />
      {savedCardList.length !== 0 &&
        <MoviesCardList
          moviesCardList={moviesCardList}
          savedCardList={savedCardList}
          notFound={notFound}
          prefix={true}
          switchSaveIco1={switchSaveIco}
        />}
    </div >
  );
}

export default Movies;
