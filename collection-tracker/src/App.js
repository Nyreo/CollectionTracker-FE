import {useState, useEffect, lazy, Suspense} from 'react'
import { isMobile } from 'react-device-detect';

import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// router

import headerImage from './images/header-photo.jpg';

import PageRouter from './components/pagerouter';

const FeedbackBox = lazy(() => import('./components/feedbackBox'))

const renderLoader = () => <p>Loading</p>;

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

const theme = createMuiTheme()

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

  const savePwaChoice = choice => {
    localStorage.setItem('pwaInstallation', choice);
    setPwaOpen(choice);
  }

  const getPwaChoice = () => localStorage.getItem('pwaInstallation') ? false : true;

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
  // whether the user has read the PWA message
  const [pwaOpen, setPwaOpen] = useState(getPwaChoice());


  useEffect(() => {
    console.log("token has been updated", token)
  }, [token])

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <Suspense fallback={renderLoader()}>
          <FeedbackBox 
            message={notification.message} 
            type={notification.type}
            open={open}
            setOpen={(val) => setOpen(val)}
          />
        </Suspense>
        <Suspense fallback={renderLoader()}>
          <FeedbackBox 
            message={
              <span>Hi! This website can be downloaded to your device! Find out more <a href='https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DDesktop&hl=en'>PWA Installation</a></span>  
            } 
            type={"notification"}
            open={pwaOpen && isMobile}
            autoHide={false}
            setOpen={savePwaChoice}
          />
        </Suspense>
        
        <PageRouter 
          token={token} 
          saveToken={saveToken}
          clearToken={clearToken}
          updateNotification={updateNotification}  
        />
      </div>
    </MuiThemeProvider>
    
  )
}

export default App;
