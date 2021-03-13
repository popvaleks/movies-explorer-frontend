import React, { useState, useCallback, useEffect } from 'react';

import './Saved.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import { getMyMovies, unsaveMovies } from '../../utils/MoviesApi';

function Saved({
  addCardOnScreen, errorServer, handleServerError,
  cardOnPage, setDefaultCardOnPage }) {
  const [searchList, setSearchList] = useState([])
  const [savedCardList, setSavedCardList] = useState([])
  const [notFound, setNotFound] = useState(false)
  const [switchBoxEnable, setSwitchBoxEnable] = useState(false)
  const [shortMovesCardList, setShortMovesCardList] = useState([])
  const [shortSearchList, setShortSearchList] = useState([])

  const handleGetSavedsCard = useCallback(() => {
    getMyMovies()
      .then((cards) => {
        cards.message === 'Список фильмов отсутствует'
          ? (setSavedCardList([]),
            setNotFound(true))
          : (setSavedCardList(cards),
            setNotFound(false))
      })
      .catch((err) => { console.log(err) })
  }, [savedCardList])

  useEffect(() => {
    handleGetSavedsCard()
    setSearchList([])
  }, [])

  const updateSearchList = (content) => {
    if (content === "notFound") {
      setNotFound(true)
    } else if (switchBoxEnable) {
      setSearchList(content)
      setShortSearchList(content.filter((i) => i.duration < 41))
      if (content.filter((i) => i.duration < 41).length === 0) {
        setNotFound(true)
      } else {
        setNotFound(false)
      }
    } else {
      setSearchList(content)
      setNotFound(false)
    }
  }

  const handleChangeSave = (item) => {
    unsaveMovies(item._id)
      .then(() => {
        setSavedCardList(savedCardList.filter((i) => i._id !== item._id))
        if (searchList.length !== 0) {
          setSearchList(searchList.filter((i) => i._id !== item._id))
          if (switchBoxEnable) {
            setShortSearchList(shortSearchList.filter((i) => i._id !== item._id))
            if (shortSearchList.filter((i) => i._id !== item._id).length === 0) {
              setNotFound(true)
            }
          }
        }
      })
      .catch((err) => { console.log(err) })
  }

  const notFoundCheck = () => {
    savedCardList.length === 0 ? setNotFound(true) : setNotFound(false)
  }

  useEffect(() => {
    notFoundCheck()
  }, [savedCardList.length])

  const handleSwitchBox = (arg) => {
    if (arg === true) {
      if (searchList.length !== 0) {
        if (searchList.filter((i) => i.duration < 41).length === 0) {
          setNotFound(true)
        } else {
          setShortSearchList(searchList.filter((i) => i.duration < 41))
          setNotFound(false)
        }
      } else {
        if (savedCardList.filter((i) => i.duration < 41).length === 0) {
          setNotFound(true)
        } else {
          setShortMovesCardList(savedCardList.filter((i) => i.duration < 41))
          setNotFound(false)
        }
      }
      setSwitchBoxEnable(true)
    } else {
      setShortMovesCardList([])
      setShortSearchList([])
      setSearchList([])
      setSwitchBoxEnable(false)
      notFoundCheck()
    }
  }

  return (
    <div className="movies__wrapper">
      <SearchForm
        updateSearchList={updateSearchList}
        savedCardList={savedCardList}
        prefix={false}
        setSwitchBox={handleSwitchBox}
        setDefaultCardOnPage={setDefaultCardOnPage}
        handleServerError={handleServerError}
      />
      <MoviesCardList
        moviesCardList={
          notFound ? false :
            searchList.length === 0 && !switchBoxEnable ? savedCardList :
              searchList.length === 0 && switchBoxEnable ? shortMovesCardList :
                searchList.length !== 0 && !switchBoxEnable ? searchList :
                  searchList.length !== 0 && switchBoxEnable ? shortSearchList :
                    shortSearchList.length === 0 && switchBoxEnable ? false :
                      false
        }
        savedCardList={savedCardList}
        notFound={notFound}
        prefix={false}
        handleChangeSave={handleChangeSave}
        cardOnPage={cardOnPage}
        addCardOnScreen={addCardOnScreen}
        errorServer={errorServer}
      />
    </div >
  );
}

export default Saved
