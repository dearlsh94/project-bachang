import React from 'react';
import './App.css';

import {BrowserRouter, Route} from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Container from '@material-ui/core/Container';

import Header from './common/Header';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import FindId from './pages/FindId';
import FindPw from './pages/FindPw';

function App() {
  return (
    <RecoilRoot>
      <Container
        maxWidth="xl">
        <React.Fragment>
          <header>
            <Container>
              <Header/>
            </Container>
          </header>
          <main>
            <Container
              fixed>
              <BrowserRouter>
                <Route exact path="/" component={Home}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/findid" component={FindId}/>
                <Route exact path="/findpw" component={FindPw}/>
              </BrowserRouter>
            </Container>
          </main>
        </React.Fragment>
      </Container>
    </RecoilRoot>
  );
}

export default App;