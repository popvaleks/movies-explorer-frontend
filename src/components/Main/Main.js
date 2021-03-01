import React from 'react';
import './Main.css';

import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';

function Main() {
  return (
    <div className="main-about__wrapper">
      <div className="main-about__promo">
        <Promo>
        </Promo>
        <NavTab>
        </NavTab>
      </div>
      <AboutProject
      id="id1"></AboutProject>
      <Techs></Techs>
      <AboutMe></AboutMe>
      <Portfolio></Portfolio>
    </div >
  );
}

export default Main;