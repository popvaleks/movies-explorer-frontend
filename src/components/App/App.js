import React, {
  useCallback, useState, useEffect, useLayoutEffect
} from 'react';
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

const log = false;

function App() {
  const [landingHeader, setLandigHeader] = useState(true)
  const [wrapperHeight, setWrapperHeight] = useState('default')
  const [currentUser, setCurrentUser] = useState({
    name: '', film: [], email: '', _id: ''
  })
  const [loggedIn, setLoggedIn] = useState(false)
  const [cardOnPage, setCardOnPage] = useState();
  const [errorServer, setErrorServer] = useState(false)

  const history = useHistory();
  const location = useLocation();
  const routeList = ['/sign-in', '/sign-up', '/404', '/profile',
    '/saved-movies', '/movies', '/', '/edit-profile'];

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

  useEffect(() => {
    handleRouteCheck();
    handleWrapperHeight();
    handleErrorPageCheck();
  }, [handleRouteCheck, handleWrapperHeight, handleErrorPageCheck]);

  const uploadUserInfo = useCallback(() => {
    auth.getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => { console.log(err) })
  }, [loggedIn])

  const upDateUserInfo = useCallback(() => {
    auth.getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => { console.log(err) })
  }, [currentUser])

  const logoUt = () => {
    setLoggedIn(false);
  }

  const handleTokenCheck = () => {
    const jwt = getCookie('jwt')
    if (jwt) {
      setLoggedIn(true);
      uploadUserInfo();
      history.push(location.pathname)
    } else {
      setLoggedIn(false);
      console.log('not logined')
    }
  }
  useEffect(() => {
    handleTokenCheck();
  }, [])

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);

    function throttle(callback, limit) {
      let waiting = false;                      // Initially, we're not waiting
      return function () {                      // We return a throttled function
        if (!waiting) {                       // If we're not waiting
          callback.apply(this, arguments);  // Execute users function
          waiting = true;                   // Prevent future invocations
          setTimeout(function () {          // After a period of time
            waiting = false;              // And allow future invocations
          }, limit);
        }
      }
    }
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      const updateSizeTrottle = throttle(updateSize, 1000)
      window.addEventListener('resize', updateSizeTrottle);
      updateSize();
      return () => window.removeEventListener('resize', updateSizeTrottle);
    }, []);
    return size;
  }

  const [widthPage, heightPage] = useWindowSize();

  const widthChanheHaedler = () => {
    setCardOnPage(
      widthPage < 1200 ? 8 :
        widthPage < 765 ? 5 : 12)
  }

  const { innerWidth: width, innerHeight: height } = window;

  const setDefaultCardOnPage = () => {
    setCardOnPage(
      window.innerWidth > 1200 ? 12 :
        window.innerWidth > 765 ? 8 : 5)
  }

  const addCardOnScreen = () => {
    setCardOnPage(cardOnPage + (widthPage > 1200 ? 3 : 2))
  }

  const handleServerError = (arg) => {
    setErrorServer(arg)
  }

  useEffect(() => {
    widthChanheHaedler();
  }, [location.pathname, widthPage])

  // useEffect(() => {
  //   setDefaultCardOnPage();
  // }, [location.pathname])


  return (
    < CurrentUserContext.Provider value={currentUser} >
      <div>
        <div className="App">
          <Header
            landingHeader={landingHeader}
            loggedIn={loggedIn}
            logoUt={logoUt}
            handleTokenCheck={handleTokenCheck}
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
              <ProtectedRoute path="/movies" component={Movies} loggedIn={loggedIn}
                cardOnPage={cardOnPage}
                addCardOnScreen={addCardOnScreen}
                setDefaultCardOnPage={setDefaultCardOnPage}
                errorServer={errorServer}
                handleServerError={handleServerError}
              />
              <ProtectedRoute path="/saved-movies" component={Saved} loggedIn={loggedIn}
                cardOnPage={cardOnPage}
                addCardOnScreen={addCardOnScreen}
                setDefaultCardOnPage={setDefaultCardOnPage}
                errorServer={errorServer}
                handleServerError={handleServerError}
              />
              <ProtectedRoute loggedIn={loggedIn} component={Profile} path="/profile" />
              <ProtectedRoute loggedIn={loggedIn} component={Auth} path="/edit-profile"
                upDateUserInfo={upDateUserInfo}
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
    </CurrentUserContext.Provider >
  );
}

export default App;
