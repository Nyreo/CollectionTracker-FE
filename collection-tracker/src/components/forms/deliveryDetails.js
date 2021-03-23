import React, {useState, useEffect, useRef} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core/styles';

import colourTheme from '../../styles/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10px',
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
      marginTop: '10px'
    }
  },
  input: {
    [theme.breakpoints.down('sm')]: {
      height: 7,
      fontSize: '14px',
      width: '100%',
    }
  },
  uploadButton: {
    color:'white',
    backgroundColor: colourTheme.primary.main,
    '&:hover': {
      backgroundColor: colourTheme.primary.hover
    }
  },
  filePreview: {
    minHeight: '150px',
    height: '150px',
    maxHeight: '150px',

    border: "1px solid lightgray",
    borderRadius: '10px',
    marginBottom: theme.spacing(2),
    padding: '10px'
  },
  sigImage: {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
    borderRadius: '10px',
  }
}));


const DeliveryDetails = () => {
  
  const classes = useStyles()

  const [signature, setSignature] = useState("#")

  const sigRef = useRef(null)

  const handleCapture = (e) => {
    e.preventDefault()

    const fileReader = new FileReader();

    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = (e) => {
      setSignature(e.target.result)
      sigRef.current.src=e.target.result
    };
  }

  return (
    <>
      <Typography className={classes.title} variant="h6">
        Package Details
      </Typography>
      <Grid className={classes.root} container spacing={3}>
        <Grid item xs={12}>
          <TextField
            className={classes.inputbox}
            variant="outlined"
            required
            fullWidth
            id="address"
            name='address'
            label="Name of Delivery Recipient"
            inputProps = {
              {className: classes.multiInput}
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Typography id="package-slider-text" gutterBottom style={{textAlign: 'left', paddingTop: '10px'}}>
            Please upload the delivery recipient's signature.
          </Typography>
          <div className={classes.filePreview} style={{background: signature}}>
            {
              signature ? (
                <img 
                  className={classes.sigImage}
                  ref={sigRef} 
                  src='#' 
                  alt='signature'/>
              )
              :
              (
                <Typography id="package-slider-text" gutterBottom style={{color: 'lightgray'}}>
                File preview (requires upload)
                </Typography>
              )  
            }
          </div>
          <Input 
            style={{display: 'none'}} 
            accept="image/*" 
            id="signature-upload"
            type="file" 
            onChange={handleCapture}
          />
          <label htmlFor="signature-upload">
            <Button 
              fullWidth 
              variant="contained" 
              className={classes.uploadButton} 
              component="span">
              Upload Signature
            </Button>
          </label>
        </Grid>
      </Grid>
    </>
  );
}

export default DeliveryDetails