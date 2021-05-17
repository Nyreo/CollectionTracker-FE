import React, { useState, useEffect } from 'react'
import clsx from 'clsx';
// mui
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'

// module imports
import { getPackageRequestByUser } from '../../../modules/packageHandler'

// component imports
import PackageList from '../../display/PackageList'

// styles
import colourTheme from '../../../styles/theme'
import useStyles from '../../../styles/style'

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
  dataDisplay: {
    minHeight: 0,
    flex: '1',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(2),
  },
}));

const fetchPackages = async (token, setPackages, setLoading, setError) => {
  const { data, error } = await getPackageRequestByUser(token.userDetails.username, token.authHeader)

  setLoading(false)

  if (error) {
    console.log(error.toJSON().message)
    if (error.toJSON().message === 'Network Error') {
      setError(error)
    }
  }
  else setPackages(data.data)
}

const CustomerHome = ({ token }) => {

  const classes = useStyles();
  const customClasses = customStyles();

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
        "Recipient Name": _package.recpName,
        "Destination Postcode": _package.destPostcode,
        "Added": dateTime,
      }
      return newPackage
    })

    // sort packages
    extractedPackages.sort((el1, el2) => {

      const date1 = (new Date(el1['Added']))
      const date2 = (new Date(el2['Added']))

      if (date1 > date2) return -1
      else if (date1 <= date2) return 1
      return 0
    })

    return extractedPackages
  }

  useEffect(() => {
    console.log("Loaded Data!");
    console.log(packages)
  }, [packages])

  useEffect(() => {
    fetchPackages(token, setPackages, setLoading, setError)
  }, [token])

  return (
    <div className={classes.fluidContainer} style={{height: '90vh'}}>
      <Grid className={clsx(customClasses.root, classes.flex, classes.flexCol)} >
        <Grid className={customClasses.intro} item xs={12}>
          <Typography variant="h1" className={customClasses.title}>Customer Homepage</Typography>
          <Typography variant="subtitle1" >Below is a list of all the packages you have added to our system.</Typography>
        </Grid>
        <Grid className={customClasses.dataDisplay} item xs={12}>
          {loading && (
            <Typography variant="body1" className={classes.loading}>Loading Packages...</Typography>
          )}
          {
            error &&
            <Typography variant="body1" className={classes.loading}>There appears to be an issue fetching the packages. Please check your network status.</Typography>
          }
          <PackageList
            packages={packages ? extractPackageData() : null}
            displayIcon={true}
          />
        </Grid>
      </Grid>
    </div>

  )
}

export default CustomerHome