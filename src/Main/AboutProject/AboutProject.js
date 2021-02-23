import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <div className="about__wrapper">
      <h2 className="about__tittle">О проекте</h2>
      <div className="about__content">
        <div className="about__container">
          <p className="about__container-title">Дипломный проект включал 5 этапов</p>
          <p className="about__container-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about__container">
          <p className="about__container-title">На выполнение диплома ушло 5 недель</p>
          <p className="about__container-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about__progress">
        <div className="about__progress-lines about__progress_back">1 Неделя</div>
        <div className="about__progress-lines about__progress_front">4 Недели</div>
      </div>
      <div className="about__progress">
        <div className="about__progress-lines about__progress_back about__progress_subtitle">Back-end</div>
        <div className="about__progress-lines about__progress_front about__progress_subtitle">Front-end</div>
      </div>
    </div>
  );
}

export default AboutProject;
