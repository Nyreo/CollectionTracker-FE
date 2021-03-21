import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// styles
import colourTheme from '../../styles/theme'

// custom homes
import AnonHome from './anonHome'
import CustomerHome from './customerHome'
import CourierHome from './courierHome'

const useStyles = makeStyles((theme) => ({
  root: {
    position : "absolute",
    top : "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    flexGrow: 1,
    padding: 0,
  },
  container: {
    maxHeight: "75vh",
    height: '100%',
  },
  title: {
    textTransform: "capitalize",
    color: colourTheme.text.main,
    textAlign : 'center',
    fontSize: '6rem',
    marginBottom : 0,
  },
  titleText: {
    fontSize: "2em", 
    color: colourTheme.text.main,
  },
  subButton: {
    fontSize: "2em",
    margin: "20px auto",
    textTransform: "capitalize",
    color: colourTheme.text.main,
    textDecoration: 'none',
    backgroundColor : colourTheme.primary.main,
    "&:hover" :{
      backgroundColor: colourTheme.primary.hover
    },
    fontWeight: 700,
    borderRadius: "10px",
    padding: "5px 25px"
  }
}));

const renderUserpage = (_props, classes, ) => {

  if(!_props.token) return <AnonHome classes={classes} />

  switch(_props.token.userDetails.userType) {
    case 'customer':
      return <CustomerHome {..._props}/>
    case 'courier':
      return <CourierHome {..._props}/>
    case 'manager':
      break;
    default:
      return <AnonHome classes={classes} />
  }
}

const Home = ({token, updateNotification}) => {

  const classes = useStyles();

  return (
    <Container className={classes.container}>
      {renderUserpage({token, updateNotification}, classes)}
    </Container>
    
  )
}

export default Home