import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import {NavBar} from 'interra-data-catalog-components'


import Home from "./Home"
import Search from "./Search"

import { ThemeProvider } from 'styled-components'
import defaultTheme from './theme'
import './styles.css'

class App extends Component {

  render() {

      const home =   <Home />
      const search = <Search />

      return (
        <ThemeProvider theme={defaultTheme}>
            <div className="App">
              <NavBar/>
              <Router>
                <div>
                  <Route exact={true} path='/' render={()=>(home)} />
                  <Route exact={true} path='/home' render={()=>(home)} />
                  <Route exact={true} path='/search' render={()=>(search)}/>
                </div>
              </Router>
            </div>
        </ThemeProvider>
      );
  }
}

export default App;
