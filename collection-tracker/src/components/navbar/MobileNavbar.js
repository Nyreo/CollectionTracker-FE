import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Typography } from '@material-ui/core';

const customStyles = makeStyles((theme) => ({
  mobileLink: {
    textDecoration: 'none',
  }
}))

const MobileNavbar = ({ token, classes, custClasses, clearToken }) => {

  const customClasses = customStyles();

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

    switch (userType) {
      case 'customer':
        return [(
          <MenuItem key={'menu.customer.send'}>
            <Link to='/send' className={customClasses.mobileLink}>
              <Typography variant='body1'>Send package</Typography>
            </Link>
          </MenuItem>
        ),
        (
          <MenuItem key={'menu.customer.logout'}>
            <Link to='' onClick={clearToken} className={customClasses.mobileLink}>
              <Typography variant='body1'>Logout</Typography>
            </Link>
          </MenuItem>
        )]
      case 'courier':
        return [
          (
            <MenuItem key={'menu.courier.logout'}>
              <Link to='' onClick={clearToken} className={customClasses.mobileLink}>
                <Typography variant='body1'>Logout</Typography>
              </Link>
            </MenuItem>
          )]
      case 'manager':
        return [
          (
            <MenuItem key={'menu.manager.logout'}>
              <Link to='' onClick={clearToken} className={customClasses.mobileLink}>
                <Typography variant='body1'>Logout</Typography>
              </Link>
            </MenuItem>
          )]
      default:
        return [(
          <MenuItem key={'menu.anon.login'}>
            <Link to='/login' className={customClasses.mobileLink}>
              <Typography variant='body1'>Login</Typography>
            </Link>
          </MenuItem>
        ),
        (
          <MenuItem key={'menu.anon.register'}>
            <Link to='/register' className={customClasses.mobileLink}>
              <Typography variant='body1'>Register</Typography>
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

  return (
    <div>
      <div className={custClasses.sectionMobile}>
        {token && (token.userDetails.userType === 'customer') && (
          <Link to='/send'>
            <IconButton
              aria-label="send package"
              color="inherit"
            >
              <AddCircleIcon style={{ color: 'white' }} />
            </IconButton>
          </Link>
        )}
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
          style={{paddingRight: 0}}
        >
          <MoreIcon />
        </IconButton>
      </div>
      {renderMobileMenu}
    </div>

  )
}

export default MobileNavbar;

