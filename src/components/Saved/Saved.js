import React, { useState, useCallback, useEffect } from 'react';

import './Saved.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import { getMyMovies } from '../../utils/MoviesApi';

function Saved({ }) {
  const [searchList, setSearchList] = useState([])
  const [savedCardList, setSavedCardList] = useState([])
  const [notFound, setNotFound] = useState(false)

  const handleGetSavedsCard = useCallback(() => {
    getMyMovies()
      .then((cards) => {
        cards.message === 'Список фильмов отсутствует'
          ? (setSavedCardList([]),
            setNotFound(true))
          : (setSavedCardList(cards),
            setNotFound(false))
        console.log(cards)
      })
      .catch((err) => { console.log(err) })
  }, [savedCardList])

  useEffect(() => {
    handleGetSavedsCard()
  }, [])

  const updateSearchList = (content) => {
    setSearchList(content)
  }

  return (
    <div className="movies__wrapper">
      <SearchForm
        updateSearchList={updateSearchList}
      />
      <MoviesCardList
        moviesCardList={savedCardList}
        savedCardList={savedCardList}
        notFound={notFound}
        prefix={false}
      />
    </div >
  );
}

export default Saved
