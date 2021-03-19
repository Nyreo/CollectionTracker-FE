
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

// component imports
import NavBar from './navbar';

// page imports
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';


const PageRouter = ({token , saveToken, clearToken}) => {

  return (
    <Router>
      {/* navbar */}
      <NavBar 
        token={token}
        clearToken={clearToken} 
      />
      {/* routes */}
      <Switch>
        <Route render={
          (props) => token ? 
            <Redirect to='/' /> 
            : 
            <Login {...props} token={token} saveToken={saveToken}/>
        } 
        path="/login" 
        />
        <Route render={
          (props) => token ? 
            <Redirect to='/' /> 
            : 
            <Register {...props} saveToken={saveToken}/>
        } 
        path="/register" 
        />
        <Route render={
          (props) => <Home {...props} token={token} saveToken={saveToken}/>
        } 
        path="/" 
        />
      </Switch>
    </Router>
  );
}

export default PageRouter