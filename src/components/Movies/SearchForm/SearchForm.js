import React, { useEffect, useState, useCallback } from 'react';

import './SearchForm.css';
import { getAllMovies } from '../../../utils/MoviesApi'

function SearchForm({
  setDefaultCardOnPage, updateSearchList,
  prefix, savedCardList, setSwitchBox, apiMoviesCardList }) {
  const [checkboxOn, setCheckboxOn] = useState('')
  const [bgcToogle, setBGCToogle] = useState('')
  const [searchInput, setSearchInput] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [blockSearch, setBlockSearch] = useState(true)

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

  const moviesCardList = apiMoviesCardList

  const handleSearchInputChange = (evt) => {
    setSearchInput(evt.target.value)
  }

  const handlerBlockSearch = (arg) => {
    setBlockSearch(arg)
    setFormValid(arg)
  }

  const findByName = (evt) => {
    evt.preventDefault()
    const name = searchInput.toLowerCase()
    handlerBlockSearch(false)
    if (prefix) {
      const findFieldList = [...moviesCardList.entries()].filter(i => i[1].nameRU.toLowerCase().includes(name) === true).map(i => i[1])
      findFieldList.length !== 0
        ? (localStorage.setItem('searchList', JSON.stringify(findFieldList)),
          updateSearchList(JSON.stringify(findFieldList)))
        : (localStorage.setItem('searchList', ([])),
          updateSearchList([]))
      setSearchInput('')
      setDefaultCardOnPage()
      handlerBlockSearch(true)
    } else {
      const findFieldList = [...savedCardList.entries()].filter(i => i[1].nameRU.toLowerCase().includes(name) === true).map(i => i[1])
      findFieldList.length !== 0
        ? updateSearchList(findFieldList)
        : updateSearchList('notFound')
      setSearchInput('')
      handlerBlockSearch(true)
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
          <input onChange={blockSearch && handleSearchInputChange} value={searchInput}
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
