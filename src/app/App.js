import React from 'react';

import '../utils/normalize.css';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div>
      <div className="App">
        <div className="background">
          <Header>
          </Header>
          <Main>
          </Main>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default App;
