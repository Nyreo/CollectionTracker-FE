import React from 'react'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

// component imports
import PackageList from '../packageList'

const CourierHome = (props) => {
  return (
    <Grid>
      <Grid item xs={12}>
        <Button variant='contained'>Send a parcel</Button>
      </Grid>
      <Grid item xs={12}>
        <h1>Courier Homepage</h1>
      </Grid>
      <Grid item xs={12}>
        <PackageList />
      </Grid>
    </Grid>
  )
}

export default CourierHome