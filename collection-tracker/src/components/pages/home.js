import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    position : "absolute",
    top : "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    flexGrow: 1,
    padding: 0,
  },
  title: {
    textTransform: "capitalize",
    color: "whitesmoke",
    textAlign : 'center',
    fontSize: '6rem',
    marginBottom : 0,
  },
  titleText: {
    fontSize: "2em", 
    color: "whitesmoke",
  },
  subButton: {
    fontSize: "2.5em",
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
      <Grid>
        <Grid item xs={12}>
          <h1 className={classes.title}>Sending a package?</h1>
        </Grid>
        <Grid item xs={12}>
          <p className={classes.titleText}>See all your packages in one place, make an account today!</p>
        </Grid>
        <Grid item xs={12}>
          <Link to="/register" style={{textDecoration: 'none'}}>
            <Button variant="contained" className={classes.subButton}>Create an Account</Button>
          </Link>
        </Grid>
      </Grid>
    </div>
    
  )
}

export default Home