import React, { useEffect, useState, useCallback } from 'react';

import './SearchForm.css';
import { getAllMovies } from '../../../utils/MoviesApi'

function SearchForm({
  handleServerError, setDefaultCardOnPage, updateSearchList,
  prefix, savedCardList, setSwitchBox }) {
  const [checkboxOn, setCheckboxOn] = useState('')
  const [bgcToogle, setBGCToogle] = useState('')
  const [moviesCardList, setMoviesCardList] = useState([])
  const [searchInput, setSearchInput] = useState('');
  const [formValid, setFormValid] = useState(false);

  const switchBoxHandler = () => {
    if (checkboxOn === '') {
      setCheckboxOn('switchOn')
      setBGCToogle('switchColor')
      setSwitchBox(true)
    } else {
      setCheckboxOn('')
      setBGCToogle('')
      setSwitchBox(false)
    };
  }

  const handleGetmoviesCard = useCallback(() => {
    getAllMovies()
      .then((cards) => {
        setMoviesCardList(cards)
        handleServerError(false)
      })
      .catch(handleServerError(true))
  }, [moviesCardList])

  useEffect(() => {
    handleGetmoviesCard()
  }, [])


  const handleSearchInputChange = (evt) => {
    setSearchInput(evt.target.value)
  }

  const findByName = (evt) => {
    evt.preventDefault()
    const name = searchInput.toLowerCase()
    if (prefix) {
      const findFieldList = [...moviesCardList.entries()].filter(i => i[1].nameRU.toLowerCase().includes(name) === true).map(i => i[1])
      findFieldList.length !== 0
        ? (localStorage.setItem('searchList', JSON.stringify(findFieldList)),
          updateSearchList(JSON.stringify(findFieldList)))
        : (localStorage.setItem('searchList', ([])),
          updateSearchList([]))
      setSearchInput('')
      setDefaultCardOnPage()
    } else {
      const findFieldList = [...savedCardList.entries()].filter(i => i[1].nameRU.toLowerCase().includes(name) === true).map(i => i[1])
      findFieldList.length !== 0
        ? updateSearchList(findFieldList)
        : updateSearchList('notFound')
      setSearchInput('')
    }
  }

  useEffect(() => {
    searchInput === ''
      ? setFormValid(false)
      : setFormValid(true)
  }, [searchInput])

  return (
    <div className="searchForm__wrapper">
      <div className="searchForm__bar">
        <form onSubmit={findByName} className="searchForm__form">
          <div className="search__forn-ico"></div>
          <input onChange={handleSearchInputChange} value={searchInput}
            name="search" placeholder="Фильм" type="search" className="searchForm__form-input"></input>
          <button onSubmit={findByName} type="submit" disabled={!formValid}
            className={`searchForm__button ${!formValid && 'searchForm__button_invalid'}`}>Найти</button>
        </form>
      </div>
      <div className="searchForm__radio">
        <label>
          <input type="checkbox" name="checkboxName" className={`checkbox`} />
          <div onClick={switchBoxHandler} className={`switch ${checkboxOn} ${bgcToogle}`}></div>
        </label>
        <p className="searchForm__radio-text">Короткометражки</p>
      </div>
    </div>
  );
}

export default SearchForm;
