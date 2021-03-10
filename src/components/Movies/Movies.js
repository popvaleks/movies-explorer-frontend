import React, { useEffect, useState, useReducer, useCallback } from 'react';

import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { getMyMovies } from '../../utils/MoviesApi';

function Movies({ }) {
  const [searchList, setSearchList] = useState([])
  const [moviesCardList, setMoviesCardList] = useState([]);
  const [notFound, setNotFound] = useState(false)
  const [savedCardList, setSavedCardList] = useState([])

  const handleGetSavedsCard = useCallback(() => {
    getMyMovies()
      .then((cards) => {
        cards.message === 'Список фильмов отсутствует'
          ? setSavedCardList(cards)
          : setSavedCardList(cards)
      })
      .catch((err) => { console.log(err) })
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
        />}
    </div >
  );
}

export default Movies;
