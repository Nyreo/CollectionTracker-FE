import React, {useState} from 'react';
import { Link } from 'react-router-dom'

// theme import
import colourTheme from '../../styles/theme'

// module imports
import { loginRequest } from '../../modules/apiManager';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import CircularProgress from '@material-ui/core/CircularProgress';

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

    boxShadow: '2px 2px solid black',
    [theme.breakpoints.down('sm')]: {
      width:'80%',
      height: '65%',
      top: '55%'
    }
  },
  error: {
    color: 'red',
    fontSize: '1.2em',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: '10px'
    }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: colourTheme.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: colourTheme.primary.main,
    '&:hover': {
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
  loading: {
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      top: -50,
      color: 'white'
    }
  }
}));

export default function Login({history, token, saveToken, updateNotification}) {

  const classes = useStyles();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const updateError = (err) => {
    const notification = { message : err, type: 'error'}
    updateNotification(notification)
  }

  // submit login requests
  const handleFormSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    const {response, authHeader, error} = await loginRequest(credentials)
    
    if(error) {
      updateError(error);
      setLoading(false);
    } else {
      // stop loading
      setLoading(false)
      // update token
      saveToken({userDetails: response.data.data, authHeader})

      // create notification
      const notification = { message: 'You have successfully logged in!', type:'success'}
      updateNotification(notification)

      history.push('/')
    }
  }

  // update credentials on form change
  const handleCredentialUpdate = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <Container className={classes.root} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {/* loading symbol */}
        {
          loading ? (<CircularProgress className={classes.loading}/>) : null
        }
        <form className={classes.form} noValidate>
          <TextField
            className={classes.inputbox}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={credentials.username}
            onChange={handleCredentialUpdate}
            autoComplete="username"
            autoFocus
            inputProps = {
              {className: classes.input}
            }
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            className={classes.inputbox}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={credentials.password}
            onChange={handleCredentialUpdate}
            autoComplete="current-password"
            inputProps = {
              {className: classes.input}
            }
            InputLabelProps={{
              shrink: true
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleFormSubmit}
          >
            Sign In
          </Button>
          <Link to='/register' className={classes.link}>
              {`Don't have an account? Register here.`}
          </Link>
        </form>
      </div>
        
    </Container>
    
  );
}