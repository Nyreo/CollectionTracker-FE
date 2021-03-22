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
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    }
  },
  inline: {
    display: 'inline',
  },
  statusIcon: {
    fontSize: 60,
    [theme.breakpoints.down('sm')]: {
      fontSize: 37,
    }
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
    width: '20ch',
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: 'center',
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      right: -4,
      top: 4,
      width: '25%',
      backgroundColor: 'white',
    }
  },
  statusText: {
    fontSize: '18px',
    textTransform: 'capitalize',
    [theme.breakpoints.down('sm')]: {
      fontSize: '9px',
    }
  },
  tracking: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: '10px',
      backgroundColor: colourTheme.primary.main,
      borderRadius: '5px',
      color: 'white',
    }
  },
  trackingNumberHeader: {
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1em',
    }
  },
  trackingNumberValue: {
    color: colourTheme.primary.main,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8em',
      marginBottom: '10px',
      color: 'whitesmoke',
    }
  },
  entry: {
    [theme.breakpoints.down('sm')]: {
      display: 'inline-flex',
      justifyContent: 'space-between',
    }
  },
  entryText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8em'
    }
  },
  entryHeader: {
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8em'
    }
  }
}));


export default function PackageItem({data, displayIcon}) {

  const classes = useStyles()

  const renderStatusIcon = () => {
    switch(data.status) {
      case 'not-dispatched':
        return (
          <div className={classes.iconContainer}>
            <RemoveCircleIcon className={`${classes.statusIcon} ${classes.notDispatched}`} />
            <Typography className={classes.statusText}>{data.status}</Typography>
          </div>
        )
      case 'in-transit':
        return (
          <div className={classes.iconContainer}>
            <AddCircleIcon className={`${classes.statusIcon} ${classes.dispatched}`} />
            <Typography className={classes.statusText}>{data.status}</Typography>
          </div>
        )
      case 'delivered':
        return (
          <div className={classes.iconContainer}>
            <CheckCircleIcon className={`${classes.statusIcon} ${classes.delivered}`} />
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
      return (
        <Grid key={`${trackingNumber}.${key}`} item xs={12} sm={3} className={classes.entry}>
          <Typography className={classes.entryHeader}>{key}</Typography>
          <Typography className={classes.entryText}>{data[key]}</Typography>
        </Grid>
      )
    })
  }

  return (
    <ListItem alignItems="flex-start" className={classes.root}>
      {displayIcon && renderStatusIcon()}
      <Grid container spacing={1}>
        <Grid className={classes.tracking} item xs={12}>
          <Typography className={classes.trackingNumberHeader} display='inline' variant='h6'>Tracking Number: </Typography>
          <Typography className={classes.trackingNumberValue} display='inline' >{data.trackingNumber}</Typography>
        </Grid>
        {renderItemData()}
      </Grid>
    </ListItem>
  )
}