import React from 'react';

// styles
import { makeStyles } from '@material-ui/core/styles';
import colourTheme from '../../styles/theme'

// mui
import Typography from '@material-ui/core/Typography';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

// custom components
import MenuItem from './components/MenuItem';

const customStyles = makeStyles((theme) => ({
  menuButton: {
    fontSize: '1em',
    textTransform: 'capitalize',
  },
  welcomeMessage: {
    margin: 'auto 20px',
    textTransform: 'capitalize',
    borderRight: 'whitesmoke 3px solid',
    paddingRight: theme.spacing(2)
  },
  login: {
    backgroundColor: 'transparent',
  },
  register: {
    position: 'relative',
    backgroundColor: colourTheme.secondary.main,
    '&:hover': {
      backgroundColor: colourTheme.secondary.hover,
    }
  }
}))


const DesktopNavbar = ({ token, classes, clearToken }) => {

  const customClasses = customStyles();

  const renderNavButtons = () => {

    const userType = token ? token.userDetails.userType : ''

    switch (userType) {
      case 'customer':
        return (
          <>
            <Typography variant="body1" className={customClasses.welcomeMessage}>Welcome {token.userDetails.username}</Typography>
            <MenuItem
              linkTo={`/send`}
              text={`Send Package`}
              icon={(<AddBoxIcon style={{margin: 'auto'}} />)}
            />
            <MenuItem
              text={`Logout`}
              icon={(<MeetingRoomIcon />)}
              onClick={clearToken}
            />
          </>
        )
      case 'courier':
        return (
          <>
            <Typography variant="body1" className={customClasses.welcomeMessage}>Welcome {token.userDetails.username}</Typography>
            
            <MenuItem
              text={`Logout`}
              icon={(<MeetingRoomIcon />)}
              onClick={clearToken}
            />
          </>
        )
      case 'manager':
        return (
          <>
            <Typography variant="body1" className={customClasses.welcomeMessage}>Manger View</Typography>
            
            <MenuItem
              text={`Logout`}
              icon={(<MeetingRoomIcon />)}
              onClick={clearToken}
            />
          </>
        )
      default:
        return (
          <>
            <MenuItem
              linkTo={`/register`}
              text={`Register`}
              providedClasses={customClasses.register}
            />
            <MenuItem 
              linkTo={`/login`} 
              text={`Login`} 
              providedClasses={customClasses.login} 
            />
          </>
        )
    }
  }

  return (
    <div className={classes.flex}>
      {renderNavButtons(token)}
    </div>
  )
}

export default DesktopNavbar;