import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

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

const renderStatusIcon = (status, classes) => {
  switch(status) {
    case 'not-dispatched':
      return (
        <div className={classes.iconContainer}>
          <RemoveCircleIcon style={{fontSize: 60}} className={`${classes.statusIcon} ${classes.notDispatched}`} />
          <Typography className={classes.statusText}>{status}</Typography>
        </div>
      )
    case 'dispatched':
      return (
        <div className={classes.iconContainer}>
          <AddCircleIcon style={{fontSize: 60}} className={`${classes.statusIcon} ${classes.dispatched}`} />
          <Typography className={classes.statusText}>{status}</Typography>
        </div>
      )
    case 'delivered':
      return (
        <div className={classes.iconContainer}>
          <CheckCircleIcon style={{fontSize: 60}} className={`${classes.statusIcon} ${classes.delivered}`} />
          <Typography className={classes.statusText}>{status}</Typography>
        </div>
      )
    default:
      break;
  }
}

export default function PackageItem({data}) {

  const classes = useStyles()

  return (
    <ListItem alignItems="flex-start" className={classes.root}>
        {renderStatusIcon(data.status, classes)}
        <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.trackingNumberHeader} display='inline' variant='h6'>Tracking Number: </Typography>
          <Typography className={classes.trackingNumberValue} display='inline' >{data._id}</Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <Typography display='inline'>Added: </Typography>
          <Typography display='inline' >{new Date(data.date).toLocaleString()}</Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <Typography display='inline'>Address </Typography>
          <Typography display='inline' >{data.address}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography >Sender Postcode</Typography>
          <Typography >{data.sendPostcode}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography >Destination Postcode</Typography>
          <Typography >{data.destPostcode}</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography >Package Weight</Typography>
          <Typography >{data.weight}kg</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography >Destination Postcode</Typography>
          <Typography >{data.destPostcode}</Typography>
        </Grid>
      </Grid>
      </ListItem>
  )
}