import React from 'react';

import './Saved.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';

function Saved() {
  return (
    <div className="saved__wrapper">
      <SearchForm></SearchForm>
      <MoviesCardList></MoviesCardList>
    </div>
  )
}

export default Saved
