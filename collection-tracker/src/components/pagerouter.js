import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// component imports
import NavBar from './navbar';

// page imports
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';


const PageRouter = () => {
  
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default PageRouter