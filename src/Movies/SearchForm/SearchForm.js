import React, { useState } from 'react';

import './SearchForm.css';
import Preloader from '../../vendor/preloader/Preloader';

function SearchForm() {
  const [checkboxOn, setCheckboxOn] = useState('')
  const [bgcToogle, setBGCToogle] = useState('')
  const switchBoxHandler = () => {
    if (checkboxOn === '') {
      setCheckboxOn('switchOn')
      setBGCToogle('switchColor')
    } else {
      setCheckboxOn('')
      setBGCToogle('')
    };
  }

  return (
    <div className="searchForm__wrapper">
      <div className="searchForm__bar">
        <form className="searchForm__form">
          <div className="search__forn-ico"></div>
          <input name="search" placeholder="Фильм" type="search" className="searchForm__form-input"></input>
        </form>
        <button className="searchForm__button">Найти</button>
      </div>
      <div className="searchForm__radio">
        <label>
          <input type="checkbox" name="checkboxName" className={`checkbox`} />
          <div onClick={switchBoxHandler} className={`switch ${checkboxOn} ${bgcToogle}`}></div>
        </label>
        <p className="searchForm__radio-text">Короткометражки</p>
      </div>
      {false &&
        <Preloader></Preloader>
      }
    </div>
  );
}

export default SearchForm;
