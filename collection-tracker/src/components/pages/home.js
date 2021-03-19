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

const renderUserpage = (userType, classes) => {
  switch(userType) {
    case 'customer':
      return <CustomerHome />
    case 'courier':
      return <CourierHome />
    case 'manager':
      break;
    default:
      return <AnonHome classes={classes}/>
  }
}

const Home = ({token}) => {

  const classes = useStyles();

  const userType = token ? token.userType : null

  return (
    <Container>
      {renderUserpage(userType, classes)}
    </Container>
    
  )
}

export default Home