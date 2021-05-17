import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

// styles
import { makeStyles, withStyles } from '@material-ui/core'
import colourTheme from '../../../styles/theme'
// import useStyles from '../../../styles/style'

// mui
import Button from '@material-ui/core/Button';

const customStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',

    color: colourTheme.text.main,
    boxSizing: 'border-box',
    borderRadius: '10px',
    marginRight: '10px',
    '&:last-child': {
      marginRight: 0
    },

    '&:hover': {
      backgroundColor: colourTheme.primary.hover,
    }
  },
  menuButton: {
    fontSize: '1em',
  },
  menuIcon: {
    marginRight: theme.spacing(1),
  },
}))

const MenuButton = withStyles({
  root: {
    backgroundColor: colourTheme.primary.main,
    color: colourTheme.text.main
  },
})(({ classes, text }) => (
  <Button className={classes.root}>{text}</Button>
))

const MenuItem = ({ linkTo, text, icon, providedClasses, onClick }) => {

  // const classes = useStyles();
  const customClasses = customStyles();

  return (
      <Link to={linkTo ? linkTo : '/'} className={clsx(customClasses.root)} onClick={onClick}>
        <MenuButton classes={{ root: providedClasses }} text={text} />
        {icon ? icon : null}
      </Link>

  )

}

export default MenuItem;