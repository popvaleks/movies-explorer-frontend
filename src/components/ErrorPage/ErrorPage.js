import React from 'react';
import {
  useHistory, Switch, Route, useLocation,
} from 'react-router-dom';

import './ErrorPage.css'

function ErrorPage() {
  const history = useHistory();
  const linkClick = (path) => {
    history.push(path)
  };
  return (
    <div className="error-page__wrapper">
      <p className="error-page__title">404</p>
      <p className="error-page__subtitle">Страница не найдена</p>
      <a onClick={() => linkClick('/')} className="link error-page__link">Назад</a>
    </div>
  )
}

export default ErrorPage
