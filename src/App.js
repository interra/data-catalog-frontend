import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './components/Header';
import NavBar from './components/NavBar';
import {Footer} from 'interra-data-catalog-components'

import Home from "./Home"
import Search from "./Search"
import Dataset from "./Dataset";
import Organization from "./Org";
import About from "./About";
import Groups from "./Groups";

import Theme from './theme/default'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './theme/globalStyles';

class App extends Component {

  render() {

    const home =   <Home />
    const search = <Search />
    const about =  <About />
    const groups = <Groups />

    return (
      <div>
      <GlobalStyles />
      <ThemeProvider theme={Theme}>
        <div className="App">
          <Header/>
          <Router>
            <div>
              <NavBar/>
              <Route exact={true} path='/' render={()=>(home)} />
              <Route exact={true} path='/home' render={()=>(home)} />
              <Route exact={true} path='/search' render={()=>(search)}/>
              <Route exact={true} path='/dataset/:id' render={({match})=>(<Dataset id={match.params.id}/>)}/>
              <Route exact={true} path='/organization/:id' render={({match})=>(<Organization id={match.params.id}/>)}/>
              <Route exact={true} path='/about' render={()=>(about)} />
              <Route exact={true} path='/groups' render={()=>(groups)} />
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
