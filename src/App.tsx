import React from 'react';
import './App.css';

import {BrowserRouter, Route} from 'react-router-dom';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <React.Fragment>
        <main>
          <div/>
            <BrowserRouter>
              <Route exact path="/" component={Home}/>
              <Route exact path="/signin" component={SignIn}/>
              <Route exact path="/signup" component={SignUp}/>
            </BrowserRouter>
        </main>
      </React.Fragment>
  );
}

export default App;