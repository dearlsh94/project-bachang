import React from 'react';
import './App.css';

import {BrowserRouter, Route} from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Container from '@material-ui/core/Container';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './common/Header';

function App() {
  return (
    <RecoilRoot>
      <Container
        maxWidth="lg">
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
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/signup" component={SignUp}/>
              </BrowserRouter>
            </Container>
          </main>
        </React.Fragment>
      </Container>
    </RecoilRoot>
  );
}

export default App;