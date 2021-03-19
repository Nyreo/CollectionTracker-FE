import './App.css';

// standard imports
// import { useState } from 'react';

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
  // whether the user is authorized
  // const [auth, setAuth] = useState(false);

  return (
    <div className={classes.root}>
      <PageRouter />
    </div>
  )
}

export default App;
