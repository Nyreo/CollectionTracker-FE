import React, {useState, useEffect} from 'react'

import Grid from '@material-ui/core/Grid'

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';


import { makeStyles } from '@material-ui/styles'

// module imports
import { getPackageRequest, patchPackageRequest } from '../../modules/apiManager'

// component imports
import PackageList from '../packageList'

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
    color: colourTheme.primary.main
  },
  input: {
    fontSize: '2em',
    marginLeft: "1em",
    flex: 1,
  },
}));

const fetchPackages = async (token, setPackages, setLoading) => {
  const { data, error } = await getPackageRequest(token.userDetails.username, token.authHeader, true)
  
  if(error) console.log(error)
  else setPackages(data.data)

  setLoading(false)
}

const CourierHome = ({token}) => {
  
  const classes = useStyles()

  const [packages, setPackages] = useState(null)
  const [loading, setLoading] = useState(true)
  const [trackingNumber, setTrackingNumber] = useState('')
  const [error, setError] = useState('')

  const updateError = val => {
    setError(val)
    setTimeout(() => {
      setError('')
    }, 5000)
  }

  const handleChange = (e) => {
    setTrackingNumber(e.target.value)
  }

  const handleTrackingSubmit = async () => {
    const response = await patchPackageRequest(trackingNumber, "dispatched", token.authHeader)

    if(response.err) updateError(response.err)
    else {
      console.log(response)
      fetchPackages(token, setPackages, setLoading)
    }
  }

  // returns only the needed informatio from packages
  const extractPackageData = () => {
    // recpName, destPostcode, weight, elapsedTime

    const now = (new Date()).getTime()

    const extractedData = packages.map(_package => {
      const rawElapsedTime = (now - _package.date) / 1000 // seconds
      const elapsedTime = new Date(rawElapsedTime).toISOString().substr(11, 8)

      const newPackage = {
        trackingNumber: _package._id,
        status: _package.status,
        "Recipient Name" : _package.recpName,
        "Destination Postcode": _package.destPostcode,
        "Package Weight" : `${_package.weight}kg`,
        "Elapsed Time" : elapsedTime,
      }
      return newPackage
    })
    return extractedData
  }

  useEffect(() => {
    console.log("Loaded Data!");
    console.log(packages)
  }, [packages])

  useEffect(() => {
    fetchPackages(token, setPackages, setLoading)
  }, [token])
  
  return (
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
            onChange={handleChange}
          />
          <IconButton 
            className={classes.iconButton} 
            aria-label="enter-trackingnumber"
            onClick = {handleTrackingSubmit}
          >
            <SearchIcon style={{fontSize: '2em'}} />
          </IconButton>
        </Paper>
      </Grid> 
      { error && (
          <p>{error}</p>
        )}   
      <Grid className={classes.dataDisplay} item xs={12}>
        { loading && (
          <p className={classes.loading} style={{flex: '0 0 100%'}}>Loading Packages...</p>
        )}
      <PackageList packages={packages ? extractPackageData() : {}}/>
      </Grid>
    </Grid>
  )
}

export default CourierHome