import React, { useState, useEffect, useRef } from 'react';

// mui
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

// styles
import { makeStyles } from '@material-ui/core/styles';
import colourTheme from '../../styles/theme';
import useStyles from '../../styles/style';

// modules
import { patchPackageDeliver } from '../../modules/packageHandler';

const customStyles = makeStyles((theme) => ({
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
      fontSize: '12px',
      width: '100%',
      marginTop: 0
    }
  },
  uploadButton: {
    backgroundColor: colourTheme.button.main,
    '&:hover': {
      backgroundColor: colourTheme.button.hover,
      color: colourTheme.button.textHover
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '.8rem',
    }
  },
  submitButton: {
    flex: '1 0 45%',
    marginLeft: theme.spacing(2),
    color: 'white',
    backgroundColor: colourTheme.primary.main,
    '&:hover': {
      backgroundColor: colourTheme.primary.hover
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '.8rem',
    }
  },
  upload: {
    flex: '1 0 45%',
  },
  filePreview: {
    position: 'relative',
    minHeight: '150px',
    height: '150px',
    maxHeight: '150px',

    border: "1px solid lightgray",
    borderRadius: '10px',

    marginBottom: theme.spacing(2),
    padding: '10px',

    [theme.breakpoints.down('sm')]: {
      height: '100px',
      minHeight: '100px',
    }
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
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      textAlign: 'center'
    }
  },

  subText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    }
  }
}));


const DeliveryDetails = ({ handleLoadingUpdate, token, trackingnumber, handleClose, updateError, updateNotification, removePackageCallback }) => {

  const classes = useStyles();
  const customClasses = customStyles();

  const [signature, setSignature] = useState(null) // image
  const [lat, setLat] = useState(0) // lat loc
  const [lng, setLng] = useState(0) // lng loc
  const [handedTo, setHandedTo] = useState('') // recp

  const sigRef = useRef(null)

  const handleCapture = (e) => {
    e.preventDefault()

    const fileReader = new FileReader();

    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = (e) => {
      setSignature(e.target.result)
      sigRef.current.src = e.target.result
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    handleLoadingUpdate(true)

    // get delivery details
    const time = (new Date()).getTime() // time of delivery? - probably do this on the server

    const deliveryDetails = {
      time,
      lat,
      lng,
      handedTo
    }

    const response = await patchPackageDeliver(trackingnumber, 'delivered', token.authHeader, deliveryDetails, signature)

    handleLoadingUpdate(false)

    if (response.err) updateError(response.err)
    else {
      console.log(response)

      // close window
      handleClose()

      // remove package from list locally
      removePackageCallback(trackingnumber);

      // set notiifcation
      const notification = { message: 'Package has been delivered', type: 'success' }
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
    navigator.geolocation.getCurrentPosition(locationSuccess, locationFailure, { maximumAge: 0, timeout: 5000 });
  }, [])

  return (
    <Grid className={customClasses.root} container spacing={3}>
      <Grid item xs={12}>
        <TextField
          className={customClasses.inputbox}
          variant="outlined"
          required
          fullWidth
          id="drecpname"
          name='drecpname'
          label="Delivery recipient"
          value={handedTo}
          onChange={val => setHandedTo(val.target.value)}
          inputProps={
            { className: customClasses.input }
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Typography className={customClasses.subText} id="upload-directive" >
          Please upload the delivery recipient's signature.
        </Typography>
        <div className={customClasses.filePreview}>
          {
            signature ? (
              <img
                className={customClasses.sigImage}
                ref={sigRef}
                src='#'
                alt='signature' />
            )
              :
              (
                <Typography id="signature-upload-text" className={customClasses.noFileText}>
                  File preview (requires upload)
                </Typography>
              )
          }
        </div>
        <Grid className={classes.linearBtnGroup} item xs={12}>
          <Input
            style={{ display: 'none' }}
            accept="image/*"
            id="signature-upload"
            type="file"
            onChange={handleCapture}
          />
          <label className={customClasses.upload} htmlFor="signature-upload">
            <Button
              fullWidth
              variant="contained"
              className={customClasses.uploadButton}
              component="span"
            >
              Upload Signature
            </Button>
          </label>
          {signature && (
            <Button
              fullWidth
              variant="contained"
              className={customClasses.submitButton}
              component="span"
              onClick={handleSubmit}
            >
              Deliver Package
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DeliveryDetails