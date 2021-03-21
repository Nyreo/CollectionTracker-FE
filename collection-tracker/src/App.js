import {useState, useEffect} from 'react'

import { makeStyles } from '@material-ui/core/styles';

// router
import PageRouter from './components/pagerouter';

import headerImage from './images/header-photo.jpg';

import FeedbackBox from './components/feedbackBox'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'rgba(116, 0, 184)',
    background: `linear-gradient(rgba(116, 0, 184, 0.7), rgba(83, 144, 217, 0.5)), url(${headerImage})`,
    backgroundPosition: '50% 50%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    maxWidth: "100vw",
    minHeight: '100vh',
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

  const updateNotification = (n) => {
    setNotification(n)
    setOpen(true)
  }

  // whether the user is authorized
  const [token, setToken] = useState(getToken())

  // error
  const [notification, setNotification] = useState({});
  const [open, setOpen] = useState(false)

  useEffect(() => {
    console.log("token has been updated", token)
  }, [token])


  return (
    <div className={classes.root}>
      <FeedbackBox 
        message={notification.message} 
        type={notification.type}
        open={open}
        setOpen={(val) => setOpen(val)}
      />
      <PageRouter 
        token={token} 
        saveToken={saveToken}
        clearToken={clearToken}
        updateNotification={updateNotification}  
      />
    </div>
  )
}

export default App;
