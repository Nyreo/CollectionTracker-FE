import React, {useState, useEffect, useRef} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core/styles';

import colourTheme from '../../styles/theme';

import { patchPackageDeliver } from '../../modules/apiManager'

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
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  uploadButton: {
    backgroundColor: colourTheme.button.main,
    '&:hover': {
      backgroundColor: colourTheme.button.hover,
      color : colourTheme.button.textHover
    }
  },
  upload: {
    flex: '1 0 45%',
  },
  filePreview: {
    position : 'relative',
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
  },
  noFileText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'lightgray',
  },
  submitButton: {
    flex: '1 0 45%',
    marginLeft: theme.spacing(2),
    color:'white',
    backgroundColor: colourTheme.primary.main,
    '&:hover': {
      backgroundColor: colourTheme.primary.hover
    }
  }
}));


const DeliveryDetails = ({token, trackingnumber, handleClose, updateError, updateNotification, removePackageCallback}) => {
  
  const classes = useStyles()

  const [signature, setSignature] = useState(null)
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [handedTo, setHandedTo] = useState('')

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    // get delivery details
    const time = (new Date()).getTime() // time of delivery
    
    const deliveryDetails = {
      time,
      lat,
      lng,
      handedTo
    }

    const response = await patchPackageDeliver(trackingnumber, 'delivered', token.authHeader, deliveryDetails, signature)

    if(response.err) updateError(response.err)
    else {
      console.log(response)

      // close window
      handleClose()

      // remove package from list locally
      removePackageCallback(trackingnumber);

      // set notiifcation
      const notification = {message:'Package has been delivered', type:'success'}
      updateNotification(notification)
    }
  }

  const locationSuccess = pos => {
    console.log(pos)

    setLat(pos.coords.latitude)
    setLng(pos.coords.longitude)
  }

  const locationFailure = err => {
    console.log(err);
  }

  useEffect(() => {
    // get location
    navigator.geolocation.getCurrentPosition(locationSuccess, locationFailure, { maximumAge: 0, timeout: 5000});
  }, [])

  

  return (
    <>
      <Grid className={classes.root} container spacing={3}>
        <Grid item xs={12}>
          <TextField
            className={classes.inputbox}
            variant="outlined"
            required
            fullWidth
            id="drecpname"
            name='drecpname'
            label="Delivery recipient"
            value={handedTo}
            onChange={val => setHandedTo(val.target.value)}
            inputProps = {
              {className: classes.multiInput}
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Typography id="upload-directive" >
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
                <Typography id="package-slider-text" className={classes.noFileText}>
                File preview (requires upload)
                </Typography>
              )  
            }
          </div>
          <Grid className={classes.buttonGroup} item xs={12}>
            <Input 
            style={{display: 'none'}} 
            accept="image/*" 
            id="signature-upload"
            type="file" 
            onChange={handleCapture}
            />
            <label className={classes.upload} htmlFor="signature-upload">
            <Button 
              fullWidth 
              variant="contained" 
              className={classes.uploadButton} 
              component="span">
              Upload Signature
            </Button>
            </label>
            { signature && (
              <Button 
              fullWidth 
              variant="contained" 
              className={classes.submitButton} 
              component="span"
              onClick={handleSubmit}
              >
              Deliver Package
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default DeliveryDetails