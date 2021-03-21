import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid'

// status icons
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// colours
import colourTheme from '../styles/theme'

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center'
  },
  inline: {
    display: 'inline',
  },
  statusIcon: {
  },
  notDispatched: {
    color: colourTheme.status.ndis
  },
  dispatched: {
    color: colourTheme.status.dis
  },
  delivered: {
    color: colourTheme.status.del
  },
  iconContainer: {
    width: '17ch',
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: 'center',
    marginRight: theme.spacing(2)
  },
  statusText: {
    fontSize: '18px',
    textTransform: 'capitalize'
  },
  trackingNumberHeader: {
    fontWeight: 700,
  },
  trackingNumberValue: {
    color: colourTheme.primary.main,
  }
}));



export default function PackageItem({data}) {

  const classes = useStyles()

  const renderStatusIcon = () => {
    switch(data.status) {
      case 'not-dispatched':
        return (
          <div className={classes.iconContainer}>
            <RemoveCircleIcon style={{fontSize: 60}} className={`${classes.statusIcon} ${classes.notDispatched}`} />
            <Typography className={classes.statusText}>{data.status}</Typography>
          </div>
        )
      case 'dispatched':
        return (
          <div className={classes.iconContainer}>
            <AddCircleIcon style={{fontSize: 60}} className={`${classes.statusIcon} ${classes.dispatched}`} />
            <Typography className={classes.statusText}>{data.status}</Typography>
          </div>
        )
      case 'delivered':
        return (
          <div className={classes.iconContainer}>
            <CheckCircleIcon style={{fontSize: 60}} className={`${classes.statusIcon} ${classes.delivered}`} />
            <Typography className={classes.statusText}>{data.status}</Typography>
          </div>
        )
      default:
        break;
    }
  }

  const renderItemData = () => {

    const {status, trackingNumber, ...newData} = data
    const keys = Object.keys(newData)

    return keys.map(key => {
      if(key === "trackingNumber") {
        return (
          <Grid key={`${trackingNumber}.${key}`} item xs={12}>
            <Typography className={classes.trackingNumberHeader} display='inline' variant='h6'>Tracking Number: </Typography>
            <Typography className={classes.trackingNumberValue} display='inline' >{data[key]}</Typography>
          </Grid>
        )
      } else {
        return (
          <Grid key={`${data.trackingNumber}.${key}`} item xs={6} sm={3}>
            <Typography >{key}</Typography>
            <Typography >{data[key]}</Typography>
          </Grid>
        )
      }
    })
  }

  return (
    <ListItem alignItems="flex-start" className={classes.root}>
        {renderStatusIcon()}
        <Grid container spacing={3}>
        {renderItemData()}
      </Grid>
      </ListItem>
  )
}