import React, { useCallback, useState } from 'react';
import {
  useHistory, Switch, Route, useLocation,
} from 'react-router-dom';

import '../utils/normalize.css';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies'
import Footer from '../Footer/Footer';

function App() {
  const [landingHeader, setLandigHeader] = useState(true)

  const history = useHistory();
  const location = useLocation();

  const handleRouteCheck = useCallback(() => {
    if (location.pathname === '/') {
      return (
        setLandigHeader(true))
    } else {
      return (
        setLandigHeader(false)
      )
    }
  }, [location.pathname]);

  // const handleRouteCheck = useCallback(() => {
  //   location.pathname === '/' ? setLandigHeader(true) : setLandigHeader(false)
  // }, [location.pathname]);

  React.useEffect(() => {
    handleRouteCheck();
  }, [handleRouteCheck]);

  return (
    <div>
      <div className="App">
        <Header
          landingHeader={landingHeader}
        >
        </Header>
        <div className="app__content">
          <Switch>
            <Route exact path="/">
              <Main>
              </Main>
            </Route>
            <Route path="/movies">
              <Movies>
              </Movies>
            </Route>
          </Switch>
        </div>
        <Footer></Footer>
      </div>
    </div >
  );
}

export default App;
