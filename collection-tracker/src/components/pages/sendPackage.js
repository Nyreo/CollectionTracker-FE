import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

// modules
import { postPackageRequest } from '../../modules/packageHandler';

// styles
import colourTheme from '../../styles/theme';
import useStyles from '../../styles/style';
import { makeStyles } from '@material-ui/core/styles';

// custom components
import AddressForm from '../forms/PackageAddress';
import PackageDetailsForm from '../forms/PackageDetails';
import Review from '../forms/PackageReview';

// mui
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';


const customStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    zIndex: 1,
    width: '600px',
    height: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '85vh',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    position: 'relative',
    height: '90%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      maxHeight: '80vh'
    }
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3em'
    }
  },
  stepper: {
    padding: `${theme.spacing(3)}px 0`,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  buttons: {
    position: 'absolute',
    bottom: theme.spacing(3),
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    left: -theme.spacing(3),
  },
  navButton: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: colourTheme.primary.main,
    '&:hover': {
      backgroundColor: colourTheme.primary.hover
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



export default function SendPackage({ token, updateNotification }) {

  const classes = useStyles();
  const customClasses = customStyles();


  // current stepper step
  const [activeStep, setActiveStep] = useState(0);
  // tracking number associated with new item
  const [trackingNumber, setTrackingNumber] = useState(null)
  // whether or not we are loading
  const [loading, setLoading] = useState(false)

  // new package details
  const [_package, setPackage] = useState({
    sendPostcode: '',
    destPostcode: '',
    weight: 1,
    recpName: '',
    address: '',
    date: '',
  })

  // update the package details
  const updatePackage = (prop, val) => {
    setPackage({ ..._package, [prop]: val })
  }

  const getStepContent = (step, _package, updatePackage) => {
    switch (step) {
      case 0:
        return <AddressForm _package={_package} setPackage={updatePackage} />;
      case 1:
        return <PackageDetailsForm _package={_package} setPackage={updatePackage} />;
      case 2:
        return <Review _package={_package} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = async () => {

    const nextStep = activeStep + 1

    if (nextStep >= steps.length) {
      // if last step
      setLoading(true)

      // validate package details? any missing values

      // send - wait for response
      const response = await postPackageRequest(_package, token.authHeader)

      // if an error occurred, show the notification - dont move to next page
      if (response.error) {
        const notification = { message: response.error, type: 'error' }
        updateNotification(notification);
      }
      else {
        // update response tracking number - move to next page
        setTrackingNumber(response.data.data.trackingNumber)
        setActiveStep(nextStep);
      }
      setLoading(false)
    } else {
      // if not last step, move to next step
      setActiveStep(nextStep);
    }
  };

  // going back through the form
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <main className={customClasses.layout}>
      <Paper className={clsx(customClasses.paper, classes.shadow)}>
        {/* is the user online? */}
        {navigator.onLine ?
          (
            <>
              <Typography className={customClasses.title} component="h1" variant="h4" align="center">
                Sending a Package.
              </Typography>
              {loading && (
                <CircularProgress />
              )}
              <Stepper activeStep={activeStep} className={customClasses.stepper}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel >{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <>
                {activeStep === steps.length ? (
                  <>
                    <Typography className={customClasses.thankYou} variant="h5" gutterBottom>
                      Thank you for you package.
                    </Typography>
                    <Typography className={customClasses.thankYouSub} variant="subtitle1">
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
                    <div className={customClasses.buttons}>
                      {activeStep !== 0 && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleBack}
                          className={customClasses.navButton}>
                          Back
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={customClasses.navButton}
                      >
                        {activeStep === steps.length - 1 ? 'Send Package' : 'Next'}
                      </Button>
                    </div>
                  </>
                )}
              </>
            </>
          )
          :
          (
            // offline message, disabled content
            <Typography>You must be online to use this feature.</Typography>
          )}
      </Paper>
    </main>
  );
}