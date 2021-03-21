import React, {useState} from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    
    minWidth: '100px',
    maxWidth: '25em',
    padding: '1em',
    borderRadius: '10px',
    boxSizing: 'border-box',
    color: 'whitesmoke',
    wordBreak: 'break-word',

  },
  message: {
    flex: 1,
    textTransform: 'capitalize',
    fontWeight: 700,
    fontSize: '1.2em'
  },
  notification: {
    backgroundColor: 'whitesmoke',
    color: '#292929',
  },
  success: {
    backgroundColor: '#46C460',
    color: 'whitesmoke',
  },
  error: {
    backgroundColor: '#E94D4D',
    color: 'whitesmoke',
  }
}));

export default function FeedbackBox({open, setOpen, message, type}) {

  const classes = useStyles()

  const handleClose = () => {
    setOpen(false)
  };

  const handleClass = () => {

    if(!type) type=''

    switch(type) {
      case 'success': 
        return classes.success
      case 'error': 
        return classes.error
      default:
        return classes.notification
    }
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: 'center' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
    >
      <Card className={`${classes.root} ${handleClass()}`}>
        <Typography className={classes.message}>{message}</Typography>
        <IconButton aria-label="close" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Card>
      
    </Snackbar>
  );
}