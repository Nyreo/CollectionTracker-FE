import React from 'react';
import clsx from 'clsx';

// styles
import useStyles from '../../styles/style';

// custom components
import PackageItem from './PackageItem';

// mui
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';


const customStyles = makeStyles((theme) => ({
  root: {
    overflow: 'auto',
    flex: '1',
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
  },
  list: {
    width: '100%',
    minHeight: '200px',
  }
}));

export default function PackageList({packages, displayIcon}) {

  const classes = useStyles();
  const customClasses = customStyles();

  const renderPackages = () => {

    if(!packages.length) {
      return (
        <Typography>
          There are no packages to display.
        </Typography>
      )
    }

    const _packages = []

    packages.forEach((_package, index) => {
      _packages.push(
        <div key={`package${_package.trackingNumber}`}>
          <PackageItem data={_package} displayIcon={displayIcon} />
          { index < packages.length - 1 && (<Divider component="li" />)}
        </div>
      )  
    })

    return _packages
  }

  return (
    <div className={clsx(customClasses.root, classes.shadow)}>
      <List className={customClasses.list}>
        {packages && renderPackages()}
      </List>
    </div>
    
  );
}