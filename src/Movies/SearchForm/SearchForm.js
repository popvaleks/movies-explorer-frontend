import React from 'react';
import './SearchForm.css';

function SearchForm() {
  return (
    <div className="searchForm__wrapper">
      <div className="searchForm__bar">
        <form className="searchForm__form">
          <input name="search" placeholder="Фильм" type="search" className="searchForm__form-input"></input>
        </form>
        <button className="searchForm__button">Найти</button>
      </div>
      <span className="searchForm__span"></span>
      <div className="searchForm__radio">
        <div className="searchForm__radio-button"></div>
        <p className="searchForm__radio-text">Короткометражки</p>
      </div>
    </div>
  );
}

export default SearchForm;
