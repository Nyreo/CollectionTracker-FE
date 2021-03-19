import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  propValue: {
    textAlign: 'center'
  },
  propKey: {
    textAlign: 'right',
    fontWeight: 900
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review({_package}) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Package summary
      </Typography>
      <Grid container spacing={2}>
        {/* send postcode */}
        <Grid item xs={12} sm={6} >
          <Typography gutterBottom className={classes.propKey}>Sender Postcode</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.propValue}>
          <Typography gutterBottom >{_package.sendPostcode}</Typography>
        </Grid>
        {/* dest postcode */}
        <Grid item xs={12} sm={6} >
          <Typography gutterBottom className={classes.propKey}>Destination Postcode</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.propValue}>
          <Typography gutterBottom>{_package.destPostcode}</Typography>
        </Grid>
        {/* recp name */}
        <Grid item xs={12} sm={6} >
          <Typography gutterBottom className={classes.propKey}>Recipient Name</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.propValue}>
          <Typography gutterBottom>{_package.recpName}</Typography>
        </Grid>
        {/* package weight */}
        <Grid item xs={12} sm={6} >
          <Typography gutterBottom className={classes.propKey}>Package Weight</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.propValue}>
          <Typography gutterBottom>{_package.weight}kg</Typography>
        </Grid>
        {/*  */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping Address
          </Typography>
          <Typography gutterBottom>{_package.recpName}</Typography>
          <Typography gutterBottom>{_package.address}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}