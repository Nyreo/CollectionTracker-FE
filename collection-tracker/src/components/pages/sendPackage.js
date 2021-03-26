import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import { postPackageRequest } from '../../modules/apiManager'

import colourTheme from '../../styles/theme'

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from '../forms/address';
import PackageDetailsForm from '../forms/packageDetails';
import Review from '../forms/review';
import { CircularProgress } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      maxHeight: '80vh'
    }
  },
  title : {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5em'
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  nextButton: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: colourTheme.primary.main,
    '&:hover': {
      backgroundColor: colourTheme.primary.hover
    }
  },
  backButton: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: colourTheme.button.main,
    '&:hover': {
      backgroundColor: colourTheme.button.hover,
      color : colourTheme.button.textHover
    }
  },
  mastif: {
    marginTop: '2rem', 
    color:'grey',
    [theme.breakpoints.down('sm')]: {
      fontSize:'0.8em',
      marginTop: '10px'
    }
  },
  thankYou: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
      fontWeight: 700,
      fontSize: '1.2em'
    }
  },
  thankYouSub: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1em'
    }
  }
}));

const steps = ['Shipping Address', 'Package Details', 'Review Details'];

function getStepContent(step, _package, updatePackage) {
  switch (step) {
    case 0:
      return <AddressForm _package={_package} setPackage={updatePackage}/>;
    case 1:
      return <PackageDetailsForm _package={_package} setPackage={updatePackage} />;
    case 2:
      return <Review _package={_package}/>;
    default:
      throw new Error('Unknown step');
  }
}

export default function SendPackage({token}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [trackingNumber, setTrackingNumber] = useState(null)
  const [loading, setLoading] = useState(false)

  const [_package, setPackage] = useState({
    sendPostcode: '',
    destPostcode: '',
    weight: 0,
    recpName: '',
    address: '',
    date: '',
  })

  const updatePackage = (prop, val) => {
    setPackage({..._package, [prop]: val})
    console.log(_package)
  }

  const handleNext = async () => {
    
    const nextStep = activeStep + 1

    if(nextStep >= steps.length) {
      setLoading(true)

      console.log("Sending package...");

      // send
      const response = await postPackageRequest(_package, token.authHeader)
    
      console.log(response)

      if(response.error) console.log("An error occured...");
      else {
        setTrackingNumber(response.data.data.trackingNumber)
      }
      setLoading(false)
    } 
    setActiveStep(nextStep);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography className={classes.title} component="h1" variant="h4" align="center">
            Sending a Package.
          </Typography>
          { loading && (
            <CircularProgress />
          )}
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step style={{color: 'black'}} key={label}>
                <StepLabel >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography className={classes.thankYou} variant="h5" gutterBottom>
                  Thank you for you package.
                </Typography>
                <Typography className={classes.thankYouSub} variant="subtitle1">
                  We have received your request! This package (and all other submitted packages) can be tracked on the 
                  Home page. The tracking number for this request is 
                  <Link to='/'>
                   {trackingNumber}
                  </Link>
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep, _package, updatePackage)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.backButton}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.nextButton}
                  >
                    {activeStep === steps.length - 1 ? 'Send Package' : 'Next'}
                  </Button>
                </div>
                {activeStep !== 0 && (
                  <Typography className={classes.mastif}>If you want to change any details, simply use the back button</Typography>
                )}
              </>
            )}
          </>
        </Paper>
      </main>
    </>
  );
}