import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import PackageItem from './packageItem';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',

    overflowY: 'scroll',
    minHeight: '250px',
  },
  inline: {
    display: 'inline',
  },
}));

export default function PackageList({packages, displayIcon}) {
  const classes = useStyles();

  const renderPackages = () => {

    if(!packages.length) {
      return (
        <Typography>
          There are no packages to display.
        </Typography>
      )
    }

    const _packages = []

    packages.forEach(_package => {
      _packages.push(
        <div key={`package${_package.trackingNumber}`}>
          <PackageItem data={_package} displayIcon={displayIcon} />
          <Divider component="li" />
        </div>
      )  
    })

    return _packages
  }

  return (
    <div className={classes.root}>
      <List >
        {packages && renderPackages()}
      </List>
    </div>
    
  );
}