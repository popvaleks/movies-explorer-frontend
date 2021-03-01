import React from 'react';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import film1 from '../../../images/cardImg/tiny/film1.jpg';
import film2 from '../../../images/cardImg/tiny/film2.jpg';
import film3 from '../../../images/cardImg/tiny/film3.jpg';
import film4 from '../../../images/cardImg/tiny/film4.jpg';
import film5 from '../../../images/cardImg/tiny/film5.jpg';
import film6 from '../../../images/cardImg/tiny/film6.jpg';
import film7 from '../../../images/cardImg/tiny/film7.jpg';
import film8 from '../../../images/cardImg/tiny/film8.jpg';
import film9 from '../../../images/cardImg/tiny/film9.jpg';
import film10 from '../../../images/cardImg/tiny/film10.jpg';
import film11 from '../../../images/cardImg/tiny/film11.jpg';
import film12 from '../../../images/cardImg/tiny/film12.jpg';


function MoviesCardList() {
  return (
    <div className="movies-cardList__wrapper">
      <div className="movies-cardList__content">
        <MoviesCard
          cardName={'33 слова о дизайне'}
          cardDuration={'1ч 47м'}
          cardImg={film1}
        ></MoviesCard>
        <MoviesCard
          cardName={'33 слова о дизайне'}
          cardDuration={'1ч 47м'}
          cardImg={film2}
        ></MoviesCard>
        <MoviesCard
          cardName={'33 слова о дизайне'}
          cardDuration={'1ч 47м'}
          cardImg={film3}
        ></MoviesCard>
        <MoviesCard
          cardName={'33 слова о дизайне'}
          cardDuration={'1ч 47м'}
          cardImg={film4}
        ></MoviesCard>
        <MoviesCard
          cardName={'33 слова о дизайне'}
          cardDuration={'1ч 47м'}
          cardImg={film5}
        ></MoviesCard>
        <MoviesCard
          cardName={'33 слова о дизайне'}
          cardDuration={'1ч 47м'}
          cardImg={film6}
        ></MoviesCard>
        <MoviesCard
          cardName={'33 слова о дизайне'}
          cardDuration={'1ч 47м'}
          cardImg={film7}
        ></MoviesCard>
        <MoviesCard
          cardName={'33 слова о дизайне'}
          cardDuration={'1ч 47м'}
          cardImg={film8}
        ></MoviesCard>
        <MoviesCard
          cardName={'33 слова о дизайне'}
          cardDuration={'1ч 47м'}
          cardImg={film9}
        ></MoviesCard>
        <MoviesCard
          cardName={'33 слова о дизайне'}
          cardDuration={'1ч 47м'}
          cardImg={film10}
        ></MoviesCard>
        <MoviesCard
          cardName={'33 слова о дизайне'}
          cardDuration={'1ч 47м'}
          cardImg={film11}
        ></MoviesCard>
        <MoviesCard
          cardName={'33 слова о дизайне'}
          cardDuration={'1ч 47м'}
          cardImg={film12}
        ></MoviesCard>
      </div>
      <div className="movies-cardList__more">
        <button className="movies-cardList__more-button">
          <p className="movies-cardList__more-button-text">Еще</p>
        </button>
      </div>
      {false && <div className="movies-cardList__not-found">
        {`К сожалению, ни чего не найдено (`}
      </div>}
    </div>
  );
}

export default MoviesCardList;
