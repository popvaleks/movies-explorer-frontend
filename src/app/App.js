import React, { useCallback, useState } from 'react';
import {
  useHistory, Switch, Route, useLocation,
} from 'react-router-dom';

import '../utils/normalize.css';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Auth from '../Auth/Auth';
import Movies from '../Movies/Movies';
import Saved from '../Saved/Saved';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import ErrorPage from '../ErrorPage/ErrorPage';

function App() {
  const [landingHeader, setLandigHeader] = useState(true)
  const [wrapperHeight, setWrapperHeight] = useState('100vh')

  const history = useHistory();
  const location = useLocation();


  const handleWrapperHeight = useCallback(() => {
    (location.pathname === '/sign-in'
      || location.pathname === '/sign-up'
      || location.pathname === '/404')
      ? setWrapperHeight('app__content_withOutFooterAndHeader')
      : location.pathname === '/profile'
        ? setWrapperHeight('app__content_withOutFooter')
        : setWrapperHeight('app__content')
  }, [location.pathname]);

  const handleRouteCheck = useCallback(() => {
    location.pathname === '/'
      ? setLandigHeader(true)
      : setLandigHeader(false)
  }, [location.pathname]);

  React.useEffect(() => {
    handleRouteCheck();
    handleWrapperHeight();
  }, [handleRouteCheck, handleWrapperHeight]);

  return (
    <div>
      <div className="App">
        <Header
          landingHeader={landingHeader}
        >
        </Header>
        <div className={wrapperHeight}>
          <Switch>
            <Route exact path="/">
              <Main>
              </Main>
            </Route>
            <Route exact path="/sign-up">
              <Auth
                title='Добро пожаловать!'
                nameField='true'
                btnText='Зарегестрироваться'
                subtitleText='Уже зарегестрированы'
                subtitleLink='Войти'
                subtitleLinkRoute='sign-in'
              >
              </Auth>
            </Route>
            <Route exact path="/sign-in">
              <Auth
                title='Рады видеть!'
                btnText='Войти'
                subtitleText='Еще не зарегестрированы'
                subtitleLink='Регистрация'
                subtitleLinkRoute='sign-up'
              >
              </Auth>
            </Route>
            <Route path="/movies">
              <Movies>
              </Movies>
            </Route>
            <Route path="/saved-movies">
              <Saved>
              </Saved>
            </Route>
            <Route path="/profile">
              <Profile>
              </Profile>
            </Route>
            <Route path="/404">
              <ErrorPage>
              </ErrorPage>
            </Route>
          </Switch>
        </div>
        <Footer></Footer>
      </div>
    </div >
  );
}

export default App;
