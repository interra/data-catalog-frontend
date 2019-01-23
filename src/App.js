import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import {Header} from 'interra-data-catalog-components'
import {Footer} from 'interra-data-catalog-components'


import Home from "./Home"
import Search from "./Search"
import Dataset from "./Dataset";

import { css } from '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Theme from './theme/default'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './theme/globalStyles';

class App extends Component {

  render() {

      const home =   <Home />
      const search = <Search />

      return (
        <div>
        <GlobalStyles />
        <ThemeProvider theme={Theme}>
          <div className="App">
            <Header/>
            <Router>
              <div>
                <Route exact={true} path='/' render={()=>(home)} />
                <Route exact={true} path='/home' render={()=>(home)} />
                <Route exact={true} path='/search' render={()=>(search)}/>
                <Route exact={true} path='/dataset/:id' render={({match})=>(<Dataset id={match.params.id}/>)}/>
              </div>
            </Router>
            <Footer/>
          </div>
        </ThemeProvider>
        </div>
      );
  }
}

export default App;
