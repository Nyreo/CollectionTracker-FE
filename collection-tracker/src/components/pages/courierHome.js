import React from 'react'

import Grid from '@material-ui/core/Grid'

// component imports
import PackageTable from '../packageTable'

const CourierHome = (props) => {
  return (
    <Grid>
      <Grid item xs={12}>
        <h1>Courier Homepage</h1>
      </Grid>
      <Grid item xs={12}>
        <PackageTable />
      </Grid>
    </Grid>
  )
}

export default CourierHome