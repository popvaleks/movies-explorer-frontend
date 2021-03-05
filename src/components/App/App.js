import React, { useCallback, useState } from 'react';
import {
  useHistory, Switch, Route, useLocation,
} from 'react-router-dom';

import '../../utils/normalize.css';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Auth from '../Auth/Auth';
import Movies from '../Movies/Movies';
import Saved from '../Saved/Saved';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import ErrorPage from '../ErrorPage/ErrorPage';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { getCookie } from '../../utils/cookieHandler'
import * as auth from '../../utils/MainApi';

const log = true;

function App() {
  const [landingHeader, setLandigHeader] = useState(true)
  const [wrapperHeight, setWrapperHeight] = useState('default')
  const [currentUser, setCurrentUser] = React.useState({
    name: '', film: [], email: '', _id: '',
  })
  const [loggedIn, setLoggedIn] = useState(false)

  const history = useHistory();
  const location = useLocation();

  const routeList = ['/sign-in', '/sign-up', '/404', '/profile', '/saved-movies', '/movies', '/', '/edit-profile'];


  const handleErrorPageCheck = useCallback(() => {
    const path = location.pathname;
    if (routeList.includes(path, 0) !== true) {
      return history.push('/404')
    } else {
      return
    }
  }, [location.pathname]);

  const handleWrapperHeight = useCallback(() => {
    (location.pathname === '/sign-in'
      || location.pathname === '/sign-up'
      || location.pathname === '/edit-profile'
      || location.pathname === '/404')
      ? setWrapperHeight('withOutFooterAndHeader')
      : location.pathname === '/profile'
        ? setWrapperHeight('withOutFooter')
        : setWrapperHeight('default')
  }, [location.pathname]);

  const handleRouteCheck = useCallback(() => {
    location.pathname === '/'
      ? setLandigHeader(true)
      : setLandigHeader(false)
  }, [location.pathname]);

  React.useEffect(() => {
    handleRouteCheck();
    handleWrapperHeight();
    handleErrorPageCheck();
  }, [handleRouteCheck, handleWrapperHeight, handleErrorPageCheck]);

  const uploadUserInfo = () => {
    auth.getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => { console.log(err) })
  }

  const handleTokenCheck = () => {
    const jwt = getCookie('jwt')
    const path = location.pathname;
    if (jwt) {
      setLoggedIn(true);
      uploadUserInfo();
      history.push(path);
      console.log(currentUser)
    }
  }

  React.useEffect(() => {
    handleTokenCheck();
    // eslint-disable-next-line
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <div className="App">
          <Header
            landingHeader={landingHeader}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
          <div className={`${wrapperHeight === 'withOutFooterAndHeader' ? 'app__content_withOutFooterAndHeader'
            : wrapperHeight === 'withOutFooter' ? 'app__content_withOutFooter'
              : 'app__content'}`}>
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>
              <ProtectedRoute path="/sign-up" loggedIn={!loggedIn} component={Auth}
                title='Добро пожаловать!'
                nameField='true'
                passField='true'
                btnText='Зарегестрироваться'
                subtitleText='Уже зарегестрированы'
                subtitleLink='Войти'
                subtitleLinkRoute='sign-in'
              />
              <ProtectedRoute path="/sign-in" loggedIn={!loggedIn} component={Auth}
                setLoggedIn={setLoggedIn}
                title='Рады видеть!'
                passField='true'
                btnText='Войти'
                subtitleText='Еще не зарегестрированы'
                subtitleLink='Регистрация'
                subtitleLinkRoute='sign-up'
              />
              <ProtectedRoute path="/movies" component={Movies} loggedIn={loggedIn}>
              </ProtectedRoute>
              <ProtectedRoute path="/saved-movies" component={Saved} loggedIn={currentUser.loggedIn}>
              </ProtectedRoute>
              <ProtectedRoute loggedIn={loggedIn} component={Profile} path="/profile" />
              <ProtectedRoute loggedIn={loggedIn} component={Auth} path="/edit-profile"
                title='Введите новые данные!'
                editProfile='true'
                nameField='true'
                btnText='Сохранить'
                subtitleText='Передумали?'
                subtitleLink='Назад'
                subtitleLinkRoute='/profile' />
              <Route path="/404">
                <ErrorPage />
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </div >
    </CurrentUserContext.Provider>
  );
}

export default App;
