import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

import DeliveryDetails from '../forms/deliveryDetails';

const useStyles = makeStyles((theme) => ({
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
    marginLeft: 'auto',
  }
}));


export default function DeliveryDialog({removePackageCallback, open, setOpen, trackingnumber, token, updateError, updateNotification}) {

  const classes = useStyles()

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoadingUpdate = val => setLoading(val)

  return (
    <div>
      <Dialog className={classes.root} open={open} onClose={handleClose} aria-labelledby="delivery-dialog-title">
        <CloseIcon className={classes.close} onClick={handleClose}/>
        <DialogTitle id="delivery-dialog-title">Making a delivery.</DialogTitle>
        <DialogContent>
          Delivery recipient details for parcel - {trackingnumber}
        </DialogContent>
        { loading && (
          <DialogContent style={{textAlign: 'center'}}>
            <CircularProgress className={classes.loading}/>
          </DialogContent>
        )}
        <DialogContent style={{overflowY: 'hidden', marginBottom: '2em'}}>
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