import React, {useState, useEffect} from 'react'

import Grid from '@material-ui/core/Grid'

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/styles'

// module imports
import { getPackageRequestByUser, patchPackagePickup } from '../../modules/packageHandler'

// component imports
import PackageList from '../display/packageList'
import DeliveryDialog from '../popups/delivery'

// styles
import colourTheme from '../../styles/theme'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '50%',
    maxHeight: 'inherit',
    transition: 'all 1s',
  },
  title: {
    fontSize: '3em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8em',
    }
  },
  intro: {
    flex: '0 0 10%',
    position: "relative",
    boxSizing: 'border-box',
    textAlign: 'left',
    color: colourTheme.text.main,
  },
  subText: {
    fontSize: '1.5em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1em',
    }
  },
  dataDisplay: {
    flex: '1',
    position:'relative',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '50%',
  },
  dataFilter: {
    flex: '0 0 10%',
    marginBottom: '1em',
    display: 'flex',
    justifyContent: 'space-between',
  },
  filterItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    borderRadius: '5px',
    height: '3em',
  },
  loading: {
    position: 'absolute',
    top: '2em',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '24px',
    color: colourTheme.primary.main,
    zIndex: 1,
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

const fetchPackages = async (token, setPackages, setLoading, setError) => {
  const { data, error } = await getPackageRequestByUser(token.userDetails.username, token.authHeader, true)
  
  if(error) {
    console.log(error.toJSON().message)
    if(error.toJSON().message === 'Network Error') {
      setError(error)
    }
  }
  else setPackages(data.data)

  setLoading(false)
}

const CourierHome = ({token, updateNotification}) => {
  
  const classes = useStyles()

  const [packages, setPackages] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [searching, setSearching] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState('')
  const [openDelivery, setOpenDelivery] = useState(false)

  const updateError = val => {
    const notification = { message : val, type: 'error'}
    updateNotification(notification)
  }

  const handleTrackingChange = (e) => {
    setTrackingNumber(e.target.value)
  }

  // performs client side validation on tracking number
  const validateTrackingNumber = () => {
    // check if empty
    if(trackingNumber === '') throw new Error("Please enter a tracking number.");
  }

  // check if package with trackingnumber has already been selected (dispatched)
  const checkExistingPackages = () => {
    for(const _package of packages) {
      if(_package._id === trackingNumber) return true
    }
    return false
  }

  const removeExistingPackage = id => {
    for(let i = 0; i < packages.length; i++) {
      if(packages[i]._id === id) {
        packages.splice(i, 1);
        break;
      } 
    }
  }

  const handleTrackingSubmit = async () => {
    // validate
    try {
      validateTrackingNumber()
    } catch(err) {
      updateError(err.message)
      return
    }

    setSearching(true)

    if(!checkExistingPackages()) {
      // package does not already exist
      const response = await patchPackagePickup(trackingNumber, "in-transit", token.authHeader)

      if(response.err) updateError(response.err)
      else {
        console.log(response)
  
        // set notiifcation
        const notification = {message:'Package has been selected', type:'success'}
        updateNotification(notification)
  
        // reset tracking number
        setTrackingNumber('')
  
        fetchPackages(token, setPackages, setLoading)
      }
    } else {
      // package already exists
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
      if(el1.date >= el2.date) return -1
      else if(el1.date < el2.date) return 1
      return 0
    })

    const extractedPackages = sortedPackages.map(_package => {
      
      const rawElapsedTime = now - _package.date
      const hourTime = 60 * 60 * 1000;
      const elapsedHours = Math.floor(rawElapsedTime / hourTime)

      const datePosted = (new Date(_package.date)).toLocaleString();

      const newPackage = {
        trackingNumber: _package._id,
        status: _package.status,
        "Recipient Name" : _package.recpName,
        "Destination Postcode": _package.destPostcode,
        "Address" : _package.address,
        "Package Weight" : `${_package.weight}kg`,
        "Date Posted": datePosted,
        "Elapsed Time (Hours)" : elapsedHours,
      }
      return newPackage
    })
    return extractedPackages
  }

  useEffect(() => {
    console.log("Loaded Data!");
  }, [packages])

  useEffect(() => {
    fetchPackages(token, setPackages, setLoading, setError)
  }, [token])
  
  return (
    <>
    <Grid className={classes.root} >
      <Grid className={classes.intro} item xs={12}>
        <h1 className={classes.title}>Courier Homepage</h1>
        <p className={classes.subText}>
          Below is a list of the packages you have picked up.
        </p>
      </Grid>
      <Grid className={classes.dataFilter} item xs={12}> 
        <Paper component="form" className={classes.trackingInput}>
          <IconButton aria-label="tracking-icon">
            <LocalShippingIcon className={classes.trackingIcon} />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
          <InputBase
            className={classes.input}
            placeholder="Enter a tracking number"
            inputProps={{ 'aria-label': 'Enter a tracking number' }}
            value={trackingNumber}
            onChange={handleTrackingChange}
          />
          <IconButton 
            className={classes.iconButton} 
            aria-label="enter-trackingnumber"
            onClick = {handleTrackingSubmit}
          >
            { searching ? 
              <CircularProgress />
              :
              <SearchIcon className={classes.trackingIcon} />
            }
            
          </IconButton>
        </Paper>
      </Grid>   
      <Grid className={classes.dataDisplay} item xs={12}>
        { loading && (
          <p className={classes.loading} style={{flex: '0 0 100%'}}>Loading Packages...</p>
        )}
        {
          error &&
          <p className={classes.loading}>There appears to be an issue fetching the packages. Please check your network status.</p>
        }
      <PackageList packages={packages ? extractPackageData() : null} displayIcon={false}/>
      </Grid>
    </Grid>
    <DeliveryDialog 
      open={openDelivery} 
      setOpen={val => setOpenDelivery(val)}
      token={token}
      trackingnumber={trackingNumber}
      updateNotification={updateNotification}
      updateError={updateError}
      removePackageCallback={removeExistingPackage}
    />
    </>
  )
}

export default CourierHome