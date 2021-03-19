import React, {useState} from 'react';
import { Link } from 'react-router-dom';

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
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
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
  }
}));

const steps = ['Shipping Address', 'Package Details', 'Review'];

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
  const [activeStep, setActiveStep] = React.useState(0);

  const [_package, setPackage] = useState({
    sendPostcode: '',
    destPostcode: '',
    weight: 0,
    recpName: '',
    address: '',
  })

  const updatePackage = (prop, val) => {
    setPackage({..._package, [prop]: val})
    console.log(_package)
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Sending a Package.
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step style={{color: 'black'}} key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Thank you for you package.
                </Typography>
                <Typography variant="subtitle1">
                  We have received your request! This package (and all other submitted packages) can be tracked on the 
                  <Link to='/'> Home page</Link>.
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
              </>
            )}
          </>
        </Paper>
      </main>
    </>
  );
}