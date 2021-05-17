import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

// styles import
import colourTheme from '../../styles/theme'
import useStyles from '../../styles/style'

// module imports
import { loginRequest } from '../../modules/userHandler';

// mui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

// mui icons
import CircularProgress from '@material-ui/core/CircularProgress';

const customStyles = makeStyles((theme) => ({
  root: {
    position : "absolute",
    top : "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxSizing: 'border-box',

    padding: '2em',
    

    backgroundColor: 'white',
    [theme.breakpoints.down('sm')]: {
      top: '55%',
      maxWidth: '80vw',
    }
  },
  error: {
    color: 'red',
    fontSize: '1.2em',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: colourTheme.primary.main,
  },
  form: {
    width: '100%',
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

export default function Login({history, saveToken, updateNotification}) {

  const classes = useStyles();
  const customClasses = customStyles();

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
    <Container className={ clsx(customClasses.root, classes.shadow, classes.rounded)} component="main" maxWidth="xs">
      <div className={ clsx(classes.flex, classes.flexCol, classes.flexCenter)}>
        <Avatar className={customClasses.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {/* loading symbol */}
        {
          loading ? (<CircularProgress className={customClasses.loading}/>) : null
        }
        <form className={customClasses.form} noValidate>
          <TextField
            className={customClasses.inputbox}
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
              {className: customClasses.input}
            }
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            className={customClasses.inputbox}
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
              {className: customClasses.input}
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
            className={customClasses.submit}
            onClick={handleFormSubmit}
          >
            Sign In
          </Button>
          <Link to='/register' className={customClasses.link}>
            <Typography variant="caption">Don't have an account? Register here.</Typography>
          </Link>
        </form>
      </div>
        
    </Container>
    
  );
}