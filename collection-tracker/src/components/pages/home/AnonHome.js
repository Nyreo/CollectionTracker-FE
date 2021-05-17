import React from 'react';
import { Link } from 'react-router-dom'

// standard
import clsx from 'clsx';

// mui 
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';

// styles
import useStyles from '../../../styles/style';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import colourTheme from '../../../styles/theme'

// stepper
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';

// icons
import Check from '@material-ui/icons/Check';
import MailRoundedIcon from '@material-ui/icons/MailRounded';
import SettingsIcon from '@material-ui/icons/Settings';
import LocalShippingRoundedIcon from '@material-ui/icons/LocalShippingRounded';


const customStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left',
    marginTop: '5rem',
  },
  title: {
    color: colourTheme.text.main,
    [theme.breakpoints.down('sm')]: {
      fontSize: '3em'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: "3em",
    }
  },
  titleText: {
    color: colourTheme.text.main,
    [theme.breakpoints.down('sm')]: {
      fontSize: "1.5em",
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: "1.2em",
    }
  },
  registerButton: {
    width: "50%",
    marginTop: '2.5em',
  },
  titleButton: {
    height: '50px',
    fontSize: "1.2em",
    fontWeight: 700,
    textTransform: "capitalize",
    color: "whitesmoke",
    borderRadius: "10px",

    margin: "2rem auto",

    backgroundColor: colourTheme.primary.main,
    "&:hover": {
      backgroundColor: colourTheme.primary.hover
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
  },
  altTitleButton: {
    border: '4px solid whitesmoke',
    boxSizing: 'border-box',
    color: 'whitesmoke',
  },
  stepperContainer: {
    marginTop: '2em',
  },
  exampleStepper: {
    borderRadius: '10px',
    paddingLeft: 0,
    paddingRight: 0,
    width: '100%'
  }
}))

const useColorlibStepIconStyles = makeStyles({
  root: {
    zIndex: 1,
    color: colourTheme.primary.main,
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundColor: colourTheme.secondary.main,
    },
  },
  completed: {
    '& $line': {
      backgroundColor: colourTheme.secondary.main,
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();

  const icons = {
    1: <MailRoundedIcon />,
    2: <SettingsIcon />,
    3: <LocalShippingRoundedIcon />,
    4: <Check />
  };

  return (
    <div
      className={classes.root}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const CustomStepLabel = withStyles({
  label: {
    color: colourTheme.primary.main,
    fontSize: 18,
  }
})(StepLabel)

const CustomStep = withStyles({
  root: {
    paddingLeft: 0,
  }
})(Step)

const AnonHome = () => {

  const classes = useStyles();
  const customClasses = customStyles();

  const steps = ["Submit package details", "Package is processed", "Assigned to a driver", "Delivered!"];

  return (
    <div className={customClasses.root}>
      <Grid>
        <Grid item xs={12}>
          <Typography variant="h2" component="h1" className={customClasses.title}>Sending a package?</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" className={customClasses.titleText}>See all your packages in one place, make an account today!</Typography>
        </Grid>
        <Grid item lg={12} className={classes.noMobile}>
          <div className={customClasses.stepperContainer}>
            <Typography variant="subtitle1" className={customClasses.titleText}>How does it work?</Typography>
            <Stepper className={customClasses.exampleStepper} activeStep={steps.length - 1} connector={<ColorlibConnector />}>
              {steps.map((label) => (
                <CustomStep key={label}>
                  <CustomStepLabel StepIconComponent={ColorlibStepIcon}>{label}</CustomStepLabel>
                </CustomStep>
              ))}
            </Stepper>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={clsx(classes.flex, classes.flexCenter)}>
            <Link to="/register" style={{ textDecoration: 'none', marginRight: '10px'}}>
              <Button variant="contained" className={customClasses.titleButton} >Create an Account</Button>
            </Link>
            <Link to="/login" style={{ textDecoration: 'none'}}>
              <Button variant="contained" className={clsx(customClasses.titleButton, customClasses.altTitleButton)}>Send a Package</Button>
            </Link>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default AnonHome