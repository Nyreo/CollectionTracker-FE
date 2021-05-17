import React, { useState, useEffect } from 'react'
import clsx from 'clsx';

// mui
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

// mui icons
import CircularProgress from '@material-ui/core/CircularProgress';

// styles
import { makeStyles } from '@material-ui/styles'
import colourTheme from '../../../styles/theme'
import useStyles from '../../../styles/style'

// module imports
import { getPackageRequestByUser, patchPackagePickup } from '../../../modules/packageHandler'

// component imports
import PackageList from '../../display/PackageList'
import DeliveryDialog from '../../popups/delivery'

const customStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    maxHeight: '100%',
    transition: 'all 1s',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '3em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8em',
    }
  },
  intro: {
    flexBasis: '10%',
    position: "relative",
    boxSizing: 'border-box',
    textAlign: 'left',
    color: colourTheme.text.main,
    marginBottom: '20px',
  },
  dataFilter: {
    flexBasis: '10%',
    marginBottom: '1em',
    display: 'flex',
    justifyContent: 'space-between',
  },
  dataDisplay: {
    minHeight: 0,
    flex: '1',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(2),
  },
  filterItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    borderRadius: '5px',
    height: '3em',
  },
  trackingInput: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    boxShadow: 'none',
    borderRadius: '10px',
  },
  trackingIcon: {
    fontSize: '2em',
    color: colourTheme.primary.main,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1em',
    }
  },
  input: {
    fontSize: '2em',
    marginLeft: "1em",
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1em',
    }
  },
}));

//  fetching packages from db
const fetchPackages = async (token, setPackages, setLoading, setError) => {
  const { data, error } = await getPackageRequestByUser(token.userDetails.username, token.authHeader, true)

  if (error) {
    console.log(error.toJSON().message)
    // dont like this?
    if (error.toJSON().message === 'Network Error') {
      setError(error)
    }
  }
  else setPackages(data.data)

  setLoading(false)
}

const CourierHome = ({ token, updateNotification }) => {

  const customClasses = customStyles()
  const classes = useStyles()

  const [packages, setPackages] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [searching, setSearching] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState('')
  const [openDelivery, setOpenDelivery] = useState(false)

  const updateError = val => {
    const notification = { message: val, type: 'error' }
    updateNotification(notification)
  }

  const handleTrackingChange = (e) => {
    setTrackingNumber(e.target.value)
  }

  // performs client side validation on tracking number
  const validateTrackingNumber = () => {
    // check if empty
    if (trackingNumber === '') throw new Error("Please enter a tracking number.");
  }

  // check if package with trackingnumber has already been selected (dispatched)
  const checkExistingPackages = () => {
    // replace with map?
    for (const _package of packages) {
      if (_package._id === trackingNumber) return true
    }
    return false
  }

  const removeExistingPackage = id => {
    for (let i = 0; i < packages.length; i++) {
      if (packages[i]._id === id) {
        packages.splice(i, 1);
        break;
      }
    }
  }

  const handleTrackingSubmit = async () => {
    // validate
    try {
      validateTrackingNumber()
    } catch (err) {
      updateError(err.message)
      return
    }

    setSearching(true)

    // if not already selected, select package
    if (!checkExistingPackages()) {
      // package does not already exist
      const response = await patchPackagePickup(trackingNumber, "in-transit", token.authHeader)

      if (response.err) updateError(response.err)
      else {
        // set notiifcation
        const notification = { message: 'Package has been selected', type: 'success' }
        updateNotification(notification)

        // reset tracking number
        setTrackingNumber('')

        // update package list
        fetchPackages(token, setPackages, setLoading)
      }
    } else {
      // package already exists - move to deliver page
      console.log("package already exists... loading delivery")
      setOpenDelivery(true);
    }
    setSearching(false)
  }

  // returns only the needed informatio from packages
  const extractPackageData = () => {
    // recpName, destPostcode, weight, elapsedTime
    const now = (new Date()).getTime()

    // sort packages
    const sortedPackages = packages.sort((el1, el2) => {
      if (el1.date >= el2.date) return -1
      else if (el1.date < el2.date) return 1
      return 0
    })

    // extract necessary package data and apply modifications
    const extractedPackages = sortedPackages.map(_package => {

      const rawElapsedTime = now - _package.date
      const hourTime = 60 * 60 * 1000;
      const elapsedHours = Math.floor(rawElapsedTime / hourTime)

      const datePosted = (new Date(_package.date)).toLocaleString();

      const newPackage = {
        trackingNumber: _package._id,
        status: _package.status,
        "Recipient Name": _package.recpName,
        "Destination Postcode": _package.destPostcode,
        "Address": _package.address,
        "Package Weight": `${_package.weight}kg`,
        "Date Posted": datePosted,
        "Elapsed Time (Hours)": elapsedHours,
      }
      return newPackage
    })
    return extractedPackages
  }

  // everytime packages is changed
  useEffect(() => {
    console.log("Loaded Data!");
  }, [packages])

  // fetch packages on render
  useEffect(() => {
    fetchPackages(token, setPackages, setLoading, setError)
  }, [token])

  return (
    <div className={classes.fluidContainer} style={{height: '90vh'}}>
      <Grid className={clsx(customClasses.root, classes.flex, classes.flexCol)} >
        <Grid className={customClasses.intro} item xs={12}>
          <Typography variant="h1" className={customClasses.title}>Courier Homepage</Typography>
          <Typography variant="subtitle1" className={customClasses.subTitle}>Below is a list of the packages you have picked up.</Typography>
        </Grid>
        <Grid className={customClasses.dataFilter} item xs={12}>
          <Paper component="form" className={customClasses.trackingInput}>
            <IconButton aria-label="tracking-icon">
              <LocalShippingIcon className={customClasses.trackingIcon} />
            </IconButton>
            <Divider className={customClasses.divider} orientation="vertical" />
            <InputBase
              className={customClasses.input}
              placeholder="Enter a tracking number"
              inputProps={{ 'aria-label': 'Enter a tracking number' }}
              value={trackingNumber}
              onChange={handleTrackingChange}
            />
            <IconButton
              className={customClasses.iconButton}
              aria-label="enter-trackingnumber"
              onClick={handleTrackingSubmit}
            >
              {searching ?
                <CircularProgress />
                :
                <SearchIcon className={customClasses.trackingIcon} />
              }

            </IconButton>
          </Paper>
        </Grid>
        <Grid className={customClasses.dataDisplay} item xs={12}>
          {loading && (
            <Typography variant="body1" className={classes.loading}>Loading Packages...</Typography>
          )}
          {
            error &&
            <Typography variant="body1" className={classes.loading}>There appears to be an issue fetching the packages. Please check your network status.</Typography>
          }
          {/* package list */}
          <PackageList packages={packages ? extractPackageData() : null} displayIcon={false} />
        </Grid>
      </Grid>
      {/* delivery popup wnd */}
      <DeliveryDialog
        open={openDelivery}
        setOpen={val => setOpenDelivery(val)}
        token={token}
        trackingnumber={trackingNumber}
        updateNotification={updateNotification}
        updateError={updateError}
        removePackageCallback={removeExistingPackage}
      />
    </div>
  )
}

export default CourierHome