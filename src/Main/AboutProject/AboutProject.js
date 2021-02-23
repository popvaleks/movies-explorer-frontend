import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <div className="about-project__wrapper">
      <h2 className="about-project__tittle">О проекте</h2>
      <div className="about-project__content">
        <div className="about-project__container">
          <p className="about-project__container-title">Дипломный проект включал 5 этапов</p>
          <p className="about-project__container-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__container">
          <p className="about-project__container-title">На выполнение диплома ушло 5 недель</p>
          <p className="about-project__container-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__progress">
        <div className="about-project__progress-lines about-project__progress_back">1 Неделя</div>
        <div className="about-project__progress-lines about-project__progress_front">4 Недели</div>
      </div>
      <div className="about-project__progress">
        <div className="about-project__progress-lines about-project__progress_back about-project__progress_subtitle">Back-end</div>
        <div className="about-project__progress-lines about-project__progress_front about-project__progress_subtitle">Front-end</div>
      </div>
    </div>
  );
}

export default AboutProject;
