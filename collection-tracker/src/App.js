import { useState, useEffect, lazy, Suspense } from 'react'
import { isMobile } from 'react-device-detect';

// mui
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// router
import PageRouter from './components/PageRouter';

const FeedbackBox = lazy(() => import('./components/popups/feedbackBox'))

const renderLoader = () => <p>Loading</p>;

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    backgroundColor: 'rgba(116, 0, 184)',
    maxWidth: "100vw",
    minHeight: '100vh',
    textAlign: "center",
  },
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: "0 12vw",
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
      padding: "0 6vw"
    },
    overflow: 'hidden',
  },
  "@keyframes animateWave": {
    "0%": {
      transform: "scale(1,0)",
    },
    "100%": {
      transform: "scale(1,1)",
    }
  },
  waveContainer: {
    display: 'block',
    position: "fixed",
    bottom: -5,
    width: "100%",
    overflow: "hidden",
  },
  waveSvg: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    transformOrigin: "bottom",
    animation: "$animateWave 1000ms cubic-bezier(0.23, 1, 0.32, 1) forwards"
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
    // material-ui
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <div className={classes.waveContainer}>
          <svg className={classes.waveSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="xMidYMid meet"><path fill="#fff" fillOpacity="1" d="M0,128L60,112C120,96,240,64,360,69.3C480,75,600,117,720,160C840,203,960,245,1080,218.7C1200,192,1320,96,1380,48L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        </div>
        <div className={classes.appContainer}>
          {/* lazy loading feedback */}
          <Suspense fallback={renderLoader()}>
            <FeedbackBox
              message={notification.message}
              type={notification.type}
              open={open}
              autoHide={true}
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

      </div>

    </MuiThemeProvider>

  )
}

export default App;
