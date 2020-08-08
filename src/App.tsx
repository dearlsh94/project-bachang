import React from 'react';
import './App.css';

import {BrowserRouter, Route} from 'react-router-dom';

import Container from '@material-ui/core/Container';

import Header from 'components/Header/Header';
import Home from 'pages/Home';
import SignIn from 'pages/Common/SignIn';
import SignUp from 'pages/Common/SignUp';
import FindId from 'pages/Common/FindId';
import FindPw from 'pages/Common/FindPw';

import Item from 'pages/Dictionary/Item';
import Raid from 'pages/Dictionary/Raid';
import RaidInfo from 'pages/Dictionary/RaidInfo';

function App() {
  return (
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
              <Route exact path="/signin" component={SignIn}/>
              <Route exact path="/signup" component={SignUp}/>
              <Route exact path="/findid" component={FindId}/>
              <Route exact path="/findpw" component={FindPw}/>
              <Route path="/dic/item" component={Item}/>
              <Route exact path="/dic/raid" component={Raid}/>
              <Route path="/dic/raid/:key" component={RaidInfo}/>
            </BrowserRouter>
          </Container>
        </main>
      </React.Fragment>
    </Container>
  );
}

export default App;