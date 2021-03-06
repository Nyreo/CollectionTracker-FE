import React, {useState} from 'react';
import { Link } from 'react-router-dom'

// styles
import colourTheme from '../../styles/theme';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

//  module imports
import { registerRequest } from '../../modules/userHandler';

const useStyles = makeStyles((theme) => ({
  root: {
    position : "absolute",
    top : "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    backgroundColor: 'white',
    borderRadius: '5px',

    minWidth : '25%',
    minHeight: '50%',

    boxShadow: '7px 7px 5px 0px rgba(0,0,0,0.22)',
    paddingBottom: "20px",
    [theme.breakpoints.down('sm')]: {
      width:'80%',
      height: '80%',
      top: '55%'
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: '0'
    }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: colourTheme.primary.main,
  },
  select: {
    marginTop: '1em',
    width: '100%',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      height: 40,
    }
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: colourTheme.primary.main,
    '&:hover' : {
      backgroundColor: colourTheme.primary.hover
    }
  },
  input: {
    [theme.breakpoints.down('sm')]: {
      height: 2,
    }
  },
  inputbox: {
    marginBottom: '0',
  },
}));

export default function Register({saveToken, history, updateNotification}) {
  const classes = useStyles();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    repeatpassword: '',
    userType: 'customer'
  })

  const handleCredentialUpdate = (e) => {
    
    setCredentials({...credentials, [e.target.name]: e.target.value})

    console.log(credentials)
  }

  const updateError = (err) => {
    const notification = { message : err, type: 'error'}
    updateNotification(notification)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    // check passwords are correct
    if(!(credentials.password && credentials.repeatpassword)) {
      updateError("Please confirm your password");
      return
    } else if(credentials.password !== credentials.repeatpassword) {
      updateError("Passwords must match!");
      return
    }

    delete credentials.repeatpassword
    const {authHeader, error} = await registerRequest(credentials)

    if(error) updateError(error)
    else {
      saveToken({userDetails: {
        username: credentials.username,
        userType: credentials.userType
      }, authHeader})

      history.push('/');
    }
  }

  return (
    <Container className={classes.root} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={credentials.username}
            onChange={handleCredentialUpdate}
            inputProps = {
              {className: classes.input}
            }
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleCredentialUpdate}
            className={classes.inputbox}
            inputProps = {
              {className: classes.input}
            }
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="repeatpassword"
            label="Repeat Password"
            type="password"
            id="repeatpassword"
            autoComplete="repeat-password"
            value={credentials.repeatpassword}
            onChange={handleCredentialUpdate}
            className={classes.inputbox}
            inputProps = {
              {className: classes.input}
            }
            InputLabelProps={{
              shrink: true
            }}
          />
          <Select
          className={classes.select}
          labelId="demo-simple-select-label"
          id="usertype"
          variant='outlined'
          name="userType"
          defaultValue={"Customer"}
          value={credentials.userType}
          onChange={handleCredentialUpdate}
          InputLabelProps={{
            shrink: true
          }}
          >
            <MenuItem value={"customer"}>Customer</MenuItem>
            <MenuItem value={"courier"}>Courier</MenuItem>
            <MenuItem value={"manager"}>Manager</MenuItem>
          </Select>
          <FormHelperText>Which type of user are you?</FormHelperText>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleFormSubmit}
          >
            Register
          </Button>
          <Link to='/login' className={classes.link}>
            {`Already have an account? Sign-in.`}
          </Link>
        </form>
      </div>
    </Container>
  );
}