import React from 'react'

import Grid from '@material-ui/core/Grid'

// component imports
import PackageTable from '../packageTable'

const CustomerHome = (props) => {
  return (
    <Grid>
      <Grid item xs={12}>
        <h1>Customer Homepage</h1>
      </Grid>
      <Grid item xs={12}>
        <PackageTable />
      </Grid>
    </Grid>
  )
}

export default CustomerHome