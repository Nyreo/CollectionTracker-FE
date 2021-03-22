import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
      marginTop: '10px'
    }
  },
  input: {
    [theme.breakpoints.down('sm')]: {
      height: 7,
      fontSize: '14px'
    }
  },
  multiInput: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px'
    }
  }
}));

const AddressForm = ({_package, setPackage}) => {

  const classes = useStyles()

  const handleChange = e => {
    e.preventDefault()

    const prop = e.target.name
    const val = e.target.value

    setPackage(prop, val)
  }

  return (
    <>
      <Typography className={classes.title} variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            className={classes.inputbox}
            variant="outlined"
            required
            fullWidth
            id="sendPostcode"
            label="Sender's Postcode"
            name="sendPostcode"
            value={_package.sendPostcode}
            onChange={handleChange}
            inputProps = {
              {className: classes.input}
            }
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            className={classes.inputbox}
            variant="outlined"
            required
            fullWidth
            id="destPostcode"
            label="Desination Postcode"
            name="destPostcode"
            value={_package.destPostcode}
            onChange={handleChange}
            inputProps = {
              {className: classes.input}
            }
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.inputbox}
            variant="outlined"
            required
            fullWidth
            id="recpName"
            label="Recipient's Name"
            name="recpName"
            value={_package.recpName}
            onChange={handleChange}
            inputProps = {
              {className: classes.input}
            }
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.inputbox}
            variant="outlined"
            required
            fullWidth
            id="address"
            name='address'
            value={_package.address}
            onChange={handleChange}
            label="Recipient's Address"
            multiline
            rows={3}
            variant="outlined"
            inputProps = {
              {className: classes.multiInput}
            }
          />
        </Grid>
      </Grid>
    </>
  );
}

export default AddressForm