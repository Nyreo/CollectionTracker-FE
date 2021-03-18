import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { Link } from "react-router-dom"

import headerImage from '../../images/header-photo.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
    padding: 0,
    '&::after' : {
      content: 'fjsdjfdsklfj',
      width: "100%",
      height: "100%",
    }
  },
  header: {
    background: `linear-gradient(rgba(2, 62, 138, 0.2), rgba(2, 62, 138, 0.7)), url(${headerImage})`,
    backgroundPosition: '50% 50%',
    backgroundSize: '1920px 1200px',
    backgroundRepeat: 'no-repeat',
    backrgoundAttachment: "fixed",
    maxWidth: "100vw",
    height: "42.5rem",
    textAlign: "center",
  },
  title: {
    textTransform: "capitalize",
    color: "whitesmoke",
    textAlign : 'center',
    fontSize: '4rem',
    marginBottom : 0,
  },
  subtitle: {
    fontSize: "1.5em",
    margin: "auto",
    textTransform: "capitalize",
    color: 'white',
  }
}));

const Home = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box 
        display='flex' 
        justifyContent="center"
        alignItems="center"
        className={classes.header}
        aria-label="header, truck on road image"
        width="100vw"
      >
        <Grid>
          <Grid item xs={12}>
            <h1 className={classes.title}>Sending a package?</h1>
          </Grid>
          <Grid item xs={12}>
            <Link to="/register" className={classes.subtitle}>Create an account today.</Link>
          </Grid>
        </Grid>
      </Box>
    </div>
    
  )
}

export default Home