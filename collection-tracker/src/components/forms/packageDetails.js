import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';


const PackageDetailsForm = ({_package, setPackage}) => {

  const maxWeight = 20

  const handleChange = (e, newVal) => {

    let val = newVal ? newVal : e.target.value

    if(val < 0) val = 0
    else if(val > maxWeight) val = maxWeight

    setPackage("weight", val)
  };

  return (
    <>
      <Typography variant="h6">
        Package Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <Typography id="package-slider-text" gutterBottom style={{textAlign: 'left'}}>
          Package Weight (kg)
        </Typography>
        <Slider
          aria-labelledby="package-slider"
          max={maxWeight}
          value={_package.weight}
          onChange={handleChange}
          marks
          valueLabelDisplay="auto"
        />
        </Grid>
        <Grid item xs={12} sm={3}>
          <OutlinedInput
            id="manual-weight-input"
            value={_package.weight}
            onChange={handleChange}
            endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
            aria-describedby="weight-manual-input-box"
            inputProps={{
              'aria-label': 'weight',
            }}
            labelWidth={0}
          />
          <FormHelperText id="weight-manual-input-text">Weight</FormHelperText>
        </Grid>
      </Grid>
    </>
  );
}

export default PackageDetailsForm