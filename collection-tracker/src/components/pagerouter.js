
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

// component imports
import NavBar from './navbar';

// page imports
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import SendPackage from "./pages/sendPackage";
import Delivery from './pages/delivery';


const PageRouter = ({token , saveToken, clearToken, updateNotification}) => {

  return (
    <Router>
      {/* navbar */}
      <NavBar 
        token={token}
        clearToken={clearToken} 
      />
      {/* routes */}
      <Switch>
        {/* delivery */}
        <Route render={
          (props) => token ? 
          <Delivery {...props} token={token} />
          :
          <Redirect to='/' />
        } 
        path="/delivery" 
        />
        {/* send package */}
        <Route render={
          (props) => token ? 
          <SendPackage {...props} token={token} />
          :
          <Redirect to='/' />
        } 
        path="/send" 
        />
        {/* login */}
        <Route render={
          (props) => token ? 
            <Redirect to='/' /> 
            : 
            <Login {...props} token={token} saveToken={saveToken} updateNotification={updateNotification}/>
        } 
        path="/login" 
        />
        {/* register */}
        <Route render={
          (props) => token ? 
            <Redirect to='/' /> 
            : 
            <Register {...props} saveToken={saveToken}/>
        } 
        path="/register" 
        />
        {/* home */}
        <Route render={
          (props) => <Home {...props} token={token} saveToken={saveToken} updateNotification={updateNotification}/>
        } 
        path="/" 
        />
        
      </Switch>
    </Router>
  );
}

export default PageRouter