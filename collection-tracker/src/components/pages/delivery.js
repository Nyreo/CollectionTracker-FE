import React, {useState} from 'react'

import DeliveryDetails from '../forms/deliveryDetails';

import colourTheme from '../../styles/theme'

import { makeStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      maxHeight: '75vh'
    }
  },
  title : {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5em'
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  nextButton: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: colourTheme.primary.main,
    '&:hover': {
      backgroundColor: colourTheme.primary.hover
    }
  },
  backButton: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: colourTheme.button.main,
    '&:hover': {
      backgroundColor: colourTheme.button.hover,
      color : colourTheme.button.textHover
    }
  },
  mastif: {
    marginTop: '2rem', 
    color:'grey',
    [theme.breakpoints.down('sm')]: {
      fontSize:'0.8em',
      marginTop: '10px'
    }
  },
  thankYou: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
      fontWeight: 700,
      fontSize: '1.2em'
    }
  },
  thankYouSub: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1em'
    }
  }
}));

export default function DeliveryPage() {

  const classes = useStyles()

  const [loading, setLoading] = useState(false)

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography className={classes.title} component="h1" variant="h4" align="center">
            Making a delivery
          </Typography>
          { loading && (
            <CircularProgress />
          )}
          <DeliveryDetails />
        </Paper>
      </main>
    </>
  )
}
