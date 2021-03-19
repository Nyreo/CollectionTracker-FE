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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
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
}));

export default function Login({history, token, saveToken}) {

  const classes = useStyles();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // submit login requests
  const handleFormSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    const response = await loginRequest(credentials)
    
    if(response.error) {
      setError(response.error)
      setTimeout(() => {
        setError(null)
      }, 5000)
    } else {
      console.log("Succesfully logged in... redirection...")
      const {username, userType} = response.data.data

      console.log(username, userType)
      // stop loading
      setLoading(false)
      // update token
      saveToken({username, userType})

      history.push('/')
    }
  }

  // update credentials on form change
  const handleCredentialUpdate = (e) => {
    
    setCredentials({...credentials, [e.target.name]: e.target.value})

    // console.log(credentials)
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
          loading ? (<CircularProgress />) : null
        }
        {/* error message */}
        {
          error ? (<span className={classes.error}>{error}</span>) : (null)
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'M137CEM Coursework 2021'}
        </Typography>
      </Box>
        
    </Container>
    
  );
}