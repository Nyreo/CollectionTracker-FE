import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  dataContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    borderBottom: '1px solid lightgray',
    marginBottom: '1em',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '0.8em',
    }
  },
  propValue: {
    flex: "0 0 50%",
    [theme.breakpoints.down('sm')]: {
      fontSize: '1em'
    }
  },
  propKey: {
    flex: "0 0 50%",
    textAlign: 'right',
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1em'
    }
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '1em',
      marginTop: theme.spacing(2),
    }
  },
}));

export default function Review({_package}) {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.title} variant="h6" gutterBottom>
        Package summary
      </Typography>
      <Grid container spacing={0}>
        {/* send postcode */}
        <Grid item xs={12}  className={classes.dataContainer}>
          <Typography className={classes.propKey}>Senders Postcode</Typography>
          <Typography className={classes.propValue}>{_package.sendPostcode}</Typography>
        </Grid>
        {/* dest postcode */}
        <Grid item xs={12}  className={classes.dataContainer}>
          <Typography className={classes.propKey}>Destination Postcode</Typography>
          <Typography className={classes.propValue}>{_package.destPostcode}</Typography>
        </Grid>
        {/* recp name */}
        <Grid item xs={12} className={classes.dataContainer}>
          <Typography className={classes.propKey}>Recipient Name</Typography>
          <Typography className={classes.propValue}>{_package.recpName}</Typography>
        </Grid>
        {/* package weight */}
        <Grid item xs={12} className={classes.dataContainer}>
          <Typography className={classes.propKey}>Package Weight</Typography>
          <Typography className={classes.propValue}>{_package.weight}kg</Typography>
        </Grid>
        {/*  */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping Address
          </Typography>
          <Typography className={classes.propValue}>{_package.recpName}</Typography>
          <Typography className={classes.propValue}>{_package.address}</Typography>
        </Grid>
      </Grid>
    </>
  );
}