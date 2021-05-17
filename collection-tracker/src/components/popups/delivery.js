import React, { useState } from 'react';

//mui
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// mui-icons
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

// styles
import { makeStyles } from '@material-ui/core/styles';

// custom components
import DeliveryDetails from '../forms/DeliveryDetails';
import { Typography } from '@material-ui/core';
import colourTheme from '../../styles/theme';

const customStyles = makeStyles((theme) => ({
  root: {
    position: 'relative'
  },
  close: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    fontSize: 30,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  loading: {
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      left: '42.5%',
      top: '42.5%',
    }
  },
  trackingNumber: {
    backgroundColor: colourTheme.primary.main,
    borderRadius: '5px',
    color: colourTheme.text.main,
    padding: theme.spacing(1),
  }
}));


export default function DeliveryDialog({ removePackageCallback, open, setOpen, trackingnumber, token, updateError, updateNotification }) {

  const customClasses = customStyles()

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoadingUpdate = val => setLoading(val)

  return (
    <div>
      <Dialog className={customClasses.root} open={open} onClose={handleClose} aria-labelledby="delivery-dialog-title">
        <CloseIcon className={customClasses.close} onClick={handleClose} />
        <DialogTitle id="delivery-dialog-title">Making a delivery.</DialogTitle>
        <DialogContent>
          <Typography variant="body1" className={customClasses.trackingNumber}>
            Parcel ID: <b>{trackingnumber}</b>
          </Typography>

        </DialogContent>
        {loading && (
          <DialogContent style={{ textAlign: 'center' }}>
            <CircularProgress className={customClasses.loading} />
          </DialogContent>
        )}
        <DialogContent style={{ overflowY: 'hidden', marginBottom: '2em' }}>
          <DeliveryDetails
            token={token}
            trackingnumber={trackingnumber}
            handleClose={handleClose}
            updateError={updateError}
            updateNotification={updateNotification}
            removePackageCallback={removePackageCallback}
            handleLoadingUpdate={handleLoadingUpdate}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}