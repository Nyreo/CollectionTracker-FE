import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
    background: `linear-gradient(rgba(67, 97, 238, 0.2), rgba(67, 97, 238, 0.7)), url(${headerImage})`,
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
  titleText: {
    fontSize: "1.2em", 
    color: "whitesmoke",
  },
  subButton: {
    fontSize: "1.2em",
    margin: "20px auto",
    textTransform: "capitalize",
    color: '#292929',
    textDecoration: 'none',
    backgroundColor : 'whitesmoke',
    "&:hover" :{
      backgroundColor: 'whitesmoke'
    },
    fontWeight: 700,
    borderRadius: "10px",
    padding: "5px 25px"
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
            <p className={classes.titleText}>See all your packages in one place, make an account today!</p>
          </Grid>
          <Grid item xs={12}>
            <Link to="/register" style={{textDecoration: 'none'}}>
              <Button variant="contained" className={classes.subButton}>Sign-up!</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
    
  )
}

export default Home