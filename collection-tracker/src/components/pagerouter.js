import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// standard imports
import Container from '@material-ui/core/Container'

// component imports
import NavBar from './navbar';

// page imports
import Home from './pages/home';

const PageRouter = () => {
  
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default PageRouter