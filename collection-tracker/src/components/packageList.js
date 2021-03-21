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
    minHeight: '25%',
  },
  inline: {
    display: 'inline',
  },
}));

export default function PackageList({packages}) {
  const classes = useStyles();

  const renderPackages = () => {

    if(!packages.length) {
      return (
        <Typography>
          You have not added any packages :(
        </Typography>
      )
    }

    const _packages = []

    packages.forEach(_package => {
      _packages.push(
        <div key={`package${_package._id}`}>
          <PackageItem data={_package}  />
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