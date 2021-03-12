import React, { useState, useCallback, useEffect } from 'react';

import './Saved.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import { getMyMovies, unsaveMovies } from '../../utils/MoviesApi';

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

  const handleChangeSave = (item) => {
    unsaveMovies(item._id)
      .then(setSavedCardList(savedCardList.filter((i) => i._id !== item._id)))
      .catch((err) => { console.log(err) })
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
        handleChangeSave={handleChangeSave}
      />
    </div >
  );
}

export default Saved
