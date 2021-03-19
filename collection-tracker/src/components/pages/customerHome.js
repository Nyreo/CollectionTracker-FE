import React from 'react'

import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'

// component imports
import PackageTable from '../packageTable'

// styles
import colourTheme from '../../styles/theme'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '3em',
  },
  intro: {
    boxSizing: 'border-box',
    textAlign: 'left',
    color: colourTheme.text.main
  }
}));

const CustomerHome = (props) => {
  
  const classes = useStyles()
  
  return (
    <Grid>
      <Grid className={classes.intro} item xs={12}>
        <h1 className={classes.title}>Customer Homepage</h1>
        <p>
          ksldfksdlfksdkfladkf adlf kadlf kadfkaldfladf
        </p>
      </Grid>
      <Grid item xs={12}>
        <PackageTable data={[]}/>
      </Grid>
    </Grid>
  )
}

export default CustomerHome