import React, {useState, useEffect} from 'react'

import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'

// module imports
import { getPackageRequest } from '../../modules/apiManager'

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
  }
}));

const CustomerHome = ({token}) => {
  
  const classes = useStyles()

  const [packages, setPackages] = useState(null)
  const [loading, setLoading] = useState(true)


  const fetchPackages = async () => {
    const { data, error } = await getPackageRequest(token.userDetails.username, token.authHeader)
    
    if(error) console.log(error)
    else setPackages(data.data)
    setLoading(false)
  }

  useEffect(() => {
    console.log("Loaded Data!");
    console.log(packages)
  }, [packages])

  useEffect(() => {
    setLoading(true)
    fetchPackages()
  }, [])
  
  return (
    <Grid className={classes.root} >
      <Grid className={classes.intro} item xs={12}>
        <h1 className={classes.title}>Customer Homepage</h1>
        <p className={classes.subText}>
          Below is a list of all the packages you have added to our system.
        </p>
      </Grid>
      <Grid className={classes.dataFilter} item xs={12}> 
        <p className={classes.filterItem} style={{flex: '0 0 70%'}}>Search</p>
        <p className={classes.filterItem} style={{flex: '0 0 25%'}}>Order</p>
      </Grid>    
      <Grid className={classes.dataDisplay} item xs={12}>
        { loading && (
          <p className={classes.loading} style={{flex: '0 0 100%'}}>Loading Packages...</p>
        )}
        <PackageList packages={packages}/>
      </Grid>
    </Grid>
  )
}

export default CustomerHome