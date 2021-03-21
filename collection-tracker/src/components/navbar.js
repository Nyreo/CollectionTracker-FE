import React from 'react';
import { Link } from 'react-router-dom';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
// import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
// import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

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
  menuButton: {
    marginRight: theme.spacing(2),
    fontSize: '1.5em',
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
    fontSize: 40,
    '&:hover' : {
      backgroundColor: colourTheme.button.hover,
      color: colourTheme.button.textHover
    }
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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

export default function NavBar({token, clearToken}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const renderNavButtons = token => {

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
      {renderMenu}
    </div>
  );
}