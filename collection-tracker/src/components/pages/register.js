import React, {useState} from 'react';
import { Link } from 'react-router-dom'

// styles
import colourTheme from '../../styles/theme';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

//  module imports
import { registerRequest } from '../../modules/apiManager';

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
    paddingBottom: "20px",
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
  select: {
    marginTop: '1em',
    width: '100%',
    textAlign: 'left',
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
}));

export default function Register() {
  const classes = useStyles();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    repeatpassword: '',
    usertype: ''
  })

  const [error, setError] = useState(null)
 

  const handleCredentialUpdate = (e) => {
    
    setCredentials({...credentials, [e.target.name]: e.target.value})

    console.log(credentials)
  }

  // const checkRepeatPassword = (e) => {
  //   if(credentials.password !== credentials.repeatpassword) {
  //     setError('Passwords do not match.')
  //   } else {
  //     setError('')
  //   }
  // }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const response = await registerRequest(credentials)

    if(response.error) {
      setError(response.error)
      setTimeout(() => {
        setError(null)
      }, 5000)
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
        {/* error message */}
        {
          error ? (<span className={classes.error}>{error}</span>) : (null)
        }
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
          />
          <Select
          className={classes.select}
          labelId="demo-simple-select-label"
          id="usertype"
          variant='outlined'
          name="usertype"
          value={credentials.userType}
          onChange={handleCredentialUpdate}
          >
            <MenuItem value={"Customer"}>Customer</MenuItem>
            <MenuItem value={"Courier"}>Courier</MenuItem>
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
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'M137CEM Coursework 2021'}
        </Typography>
      </Box>
    </Container>
  );
}