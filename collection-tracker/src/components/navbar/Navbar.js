import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

// styles

import useStyles from '../../styles/style'

// custom components
import MobileNavbar from './MobileNavbar';
import DesktopNavbar from './DesktopNavbar';


const customStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  navbarTitle: {
    fontWeight: 700,
    fontSize: "1.3rem"
  },
  
  homeButton: {
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '40px',
      height: '40px',
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
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    height: '100%',
  },
}));

const Navbar = ({ token, clearToken }) => {
  const classes = useStyles();
  const custClasses = customStyles();

  return (
    <AppBar className={custClasses.root} position="static">
      <Toolbar className={classes.noPadding}>
        <IconButton
          edge="start"
          color="inherit"
        >
          <Link to='/' className={classes.link}>
            <img alt="parcel" className={custClasses.homeButton} src={process.env.PUBLIC_URL + '/icons/maskable-icon.png'} />
          </Link>
        </IconButton>
        <Typography className={clsx(custClasses.navbarTitle, classes.noMobile)} variant="subtitle1" noWrap>
          COLLECTION TRACKER
        </Typography>

        <div className={classes.grow} />
        <div className={custClasses.sectionDesktop}>

          <DesktopNavbar token={token} classes={classes} custClasses={custClasses} clearToken={clearToken} />
        </div>
        <div className={custClasses.sectionMobile}>
          <MobileNavbar token={token} classes={classes} custClasses={custClasses} clearToken={clearToken} />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;