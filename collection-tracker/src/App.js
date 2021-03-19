import {useState, useEffect} from 'react'
// router
import PageRouter from './components/pagerouter';

import { makeStyles } from '@material-ui/core/styles';


import headerImage from './images/header-photo.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    background: `linear-gradient(rgba(67, 97, 238, 0.2), rgba(67, 97, 238, 0.7)), url(${headerImage})`,
    backgroundPosition: '50% 50%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    maxWidth: "100vw",
    height: "100vh",
    textAlign: "center",
  }
}));

const App = () => {

  const classes = useStyles();

  const getToken = () => {
    const tokenString = localStorage.getItem('token')
    const token = JSON.parse(tokenString)
  
    return token
  }
  
  const saveToken = _token => {
    localStorage.setItem('token', JSON.stringify(_token));
    setToken(_token);
  }

  const clearToken = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  // whether the user is authorized
  const [token, setToken] = useState(getToken())

  useEffect(() => {
    console.log("token has been updated", token)
  }, [token])

  return (
    <div className={classes.root}>
      <PageRouter 
        token={token} 
        saveToken={saveToken}
        clearToken={clearToken}  
      />
    </div>
  )
}

export default App;
