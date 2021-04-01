import React, {useState, useEffect} from 'react'

import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'

// module imports
import { getPackageRequestByUser } from '../../modules/packageHandler'

// component imports
import PackageList from '../display/packageList'

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
  }
}));

const fetchPackages = async (token, setPackages, setLoading, setError) => {
  const { data, error } = await getPackageRequestByUser(token.userDetails.username, token.authHeader)
  
  setLoading(false)

  if(error) {
    console.log(error.toJSON().message)
    if(error.toJSON().message === 'Network Error') {
      setError(error)
    }
  }
  else setPackages(data.data)
}

const CustomerHome = ({token}) => {
  
  const classes = useStyles()

  const [packages, setPackages] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // returns only the needed informatio from packages
  const extractPackageData = () => {
    // recpName, destPostcode, dateTime

    const extractedPackages = packages.map(_package => {
      const dateTime = new Date(_package.date).toLocaleString()

      const newPackage = {
        trackingNumber: _package._id,
        status: _package.status,
        "Recipient Name" : _package.recpName,
        "Destination Postcode": _package.destPostcode,
        "Added" : dateTime,
      }
      return newPackage
    })

    // sort packages
    extractedPackages.sort((el1, el2) => {

      const date1 = (new Date(el1['Added']))
      const date2 = (new Date(el2['Added']))

      if(date1 > date2) return -1
      else if(date1 <= date2) return 1
      return 0
    })

    return extractedPackages
  }

  useEffect(() => {
    console.log("Loaded Data!");
    console.log(packages)
  }, [packages])

  useEffect(() => {
    fetchPackages(token ,setPackages, setLoading, setError)
  }, [token])
  
  return (
    <Grid className={classes.root} >
      <Grid className={classes.intro} item xs={12}>
        <h1 className={classes.title}>Customer Homepage</h1>
        <p className={classes.subText}>
          Below is a list of all the packages you have added to our system.
        </p>
      </Grid>    
      <Grid className={classes.dataDisplay} item xs={12}>
        { loading && (
          <p className={classes.loading} style={{flex: '0 0 100%'}}>Loading Packages...</p>
        )}
        {
          error &&
          <p className={classes.loading}>There appears to be an issue fetching the packages. Please check your network status.</p>
        }
        <PackageList 
            packages={packages ? extractPackageData() : null}
            displayIcon={true}
          />
        
      </Grid>
    </Grid>
  )
}

export default CustomerHome