import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const AddressForm = ({_package, setPackage}) => {

  const handleChange = e => {
    e.preventDefault()

    const prop = e.target.name
    const val = e.target.value

    setPackage(prop, val)
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="sendPostcode"
            name="sendPostcode"
            value={_package.sendPostcode}
            onChange={handleChange}
            label="Sender's Postcode"
            fullWidth
            autoComplete="senders-postcode"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="destPostcode"
            name="destPostcode"
            value={_package.destPostcode}
            onChange={handleChange}
            label="Destination Postcode"
            fullWidth
            autoComplete="destination-postcode"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="recpName"
            name="recpName"
            value={_package.recpName}
            onChange={handleChange}
            label="Recipient's Name"
            fullWidth
            autoComplete="recipients-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="address"
            name='address'
            value={_package.address}
            onChange={handleChange}
            label="Recipient's Address"
            multiline
            rows={4}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default AddressForm