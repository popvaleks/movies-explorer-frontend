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
  const [switchBoxEnable, setSwitchBoxEnable] = useState(false)
  const [shortMovesCardList, setShortMovesCardList] = useState([])

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

  const updateSearchList = (content) => {
    setSearchList(content)
  }

  const handleGetmoviesCard = useCallback(() => {
    searchList.length !== 0
      ? (setMoviesCardList(JSON.parse(searchList)),
        setShortMovesCardList(JSON.parse(searchList).filter((i) => i.duration < 41)))
      : (setMoviesCardList([]),
        setShortMovesCardList([]),
        setNotFound(true))
  }, [searchList])

  const handleChangeSave = (card, saved) => {
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

  const handleSwitchBox = (arg) => {
    if (arg === true) {
      setSwitchBoxEnable(true)
    } else {
      setSwitchBoxEnable(false)
    }
  }

  useEffect(() => {
    handleGetmoviesCard()
  }, [searchList])

  useEffect(() => {
    handleGetSavedsCard()
    setSearchList(localStorage.getItem('searchList'))
  }, [])

  return (
    <div className="movies__wrapper">
      <SearchForm
        updateSearchList={updateSearchList}
        prefix={true}
        setSwitchBox={handleSwitchBox}
      />
      {savedCardList.length !== 0 &&
        <MoviesCardList
          moviesCardList={
            !switchBoxEnable ? moviesCardList :
              switchBoxEnable && shortMovesCardList.length !== 0 ? shortMovesCardList :
                false}
          savedCardList={savedCardList}
          notFound={notFound}
          prefix={true}
          handleChangeSave={handleChangeSave}
          switchBoxEnable={switchBoxEnable}
        />}
    </div >
  );
}

export default Movies;
