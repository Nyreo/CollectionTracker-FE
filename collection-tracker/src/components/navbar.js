import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// styles
import colourTheme from '../styles/theme'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    paddingTop: '10px',
    marginBottom: '5%'
  },
  grow: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: colourTheme.link.main,
    fontWeight: 700,
  },
  menuLink: {
    textDecoration: 'none',
    fontWeight: 700,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    fontSize: '1.3em',
    textTransform: 'capitalize',
    '&:hover' : {
      backgroundColor: colourTheme.button.hover,
      color: colourTheme.button.textHover
    }
  },
  menuIcon: {
    marginRight: theme.spacing(1),
  },
  homeButton: {
    fontSize: '2em',
    '&:hover' : {
      backgroundColor: colourTheme.button.hover,
      color: colourTheme.button.textHover
    },
  },
  welcomeMessage: {
    margin: 'auto 20px',
    textTransform: 'capitalize',
    fontSize: '1.5rem',
    fontStyle: 'italic',
    borderRight: 'whitesmoke 3px solid',
    paddingRight: theme.spacing(2)
  },
  title: {
    color: 'whitesmoke',
    fontWeight: 700,
    fontSize: '2em',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    height: '100%',
  },
}));

export default function NavBar({token, clearToken, history}) {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMobileMenuItems = () => {
    
    const userType = token ? token.userDetails.userType : ''

    switch(userType) {
      case 'customer':
        return [(
          <MenuItem key={'menu.customer.send'}>
          <Link to='/send' className={classes.menuLink}>
            <p>Send package</p>
          </Link>
          </MenuItem>
        ),
        (
          <MenuItem key={'menu.customer.logout'}>
            <Link to='' onClick={clearToken} className={classes.menuLink}>
            <p>Logout</p>
            </Link>
          </MenuItem>
        )]
      case 'courier':
        return [
        (
          <MenuItem key={'menu.courier.logout'}>
            <Link to='' onClick={clearToken} className={classes.menuLink}>
            <p>Logout</p>
            </Link>
          </MenuItem>
        )]
      default:
        return [(
            <MenuItem key={'menu.anon.login'}>
            <Link to='/login' className={classes.menuLink}>
              <p>Login</p>
            </Link>
            </MenuItem>
        ),
        (
            <MenuItem key={'menu.anon.register'}>
            <Link to='/register' className={classes.menuLink}>
              <p>Register</p>
            </Link>
            </MenuItem>
        )]
    }
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClick={handleMobileMenuClose}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {renderMobileMenuItems()}
    </Menu>
  );

  const renderNavButtons = () => {

    const userType = token ? token.userDetails.userType : ''

    switch(userType) {
      case 'customer':
        return (
          <>
            <Typography className={classes.welcomeMessage}>Welcome {token.userDetails.username}</Typography>
            <Link to='/send' className={classes.link}>
              <Button 
                color="inherit" 
                className={classes.menuButton} 
              ><AddBoxIcon className={classes.menuIcon} />
                Send Package
              </Button>
            </Link>
            <Button 
              color="inherit" 
              className={classes.menuButton}
              onClick={clearToken}  
            ><MeetingRoomIcon className={classes.menuIcon}/>
              Logout
            </Button>
          </>
        )
      case 'courier': 
        return (
          <>
            <Typography className={classes.welcomeMessage}>Welcome {token.userDetails.username}</Typography>
            <Link to='/send' className={classes.link}>
            </Link>
            <Button 
              color="inherit" 
              className={classes.menuButton}
              onClick={clearToken}  
            ><MeetingRoomIcon className={classes.menuIcon}/>
              Logout
            </Button>
          </>
        )
      default:
        return (
          <>
            <Link to='/login' className={classes.link}>
              <Button 
                color="inherit" 
                className={classes.menuButton}
              >Login</Button>
            </Link>
            <Link to='/register' className={classes.link}>
              <Button 
                color="inherit" 
                className={classes.menuButton}>
              Register</Button>
            </Link>
          </>
        )
    }
  }

  return (
    <div className={classes.grow}>
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <Link to='/' className={classes.link}>
              <HomeIcon className={classes.homeButton}/>
            </Link>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Collection Tracker
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            { renderNavButtons(token) }
          </div>
          <div className={classes.sectionMobile}>
            { token && (token.userDetails.userType === 'customer') && (
            <Link to='/send'>
              <IconButton
                aria-label="send package"
                color="inherit"
              >
                <AddCircleIcon style={{color: 'white'}}/>
              </IconButton>
            </Link>
            )}
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}