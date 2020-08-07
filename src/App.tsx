import React from 'react';
import './App.css';

import {BrowserRouter, Route} from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Container from '@material-ui/core/Container';

import Header from 'components/Common/Header';
import Home from 'pages/Home';
import SignUp from 'pages/Common/SignUp';
import FindId from 'pages/Common/FindId';
import FindPw from 'pages/Common/FindPw';

import Item from 'pages/Dictionary/Item';
import Raid from 'pages/Dictionary/Raid';

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
                <Route exact path="/dic/item" component={Item}/>
                <Route exact path="/dic/raid" component={Raid}/>
              </BrowserRouter>
            </Container>
          </main>
        </React.Fragment>
      </Container>
    </RecoilRoot>
  );
}

export default App;