import React from 'react';
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
  return (
    <div>
      <div className="App">
        <Header>
        </Header>
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
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
