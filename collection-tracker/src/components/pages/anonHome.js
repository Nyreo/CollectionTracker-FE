import React from 'react';
import {Link} from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const AnonHome = ({classes}) => {
  return (
    <div className={classes.root}>
      <Grid>
        <Grid item xs={12}>
          <h1 className={classes.title}>Sending a package?</h1>
        </Grid>
        <Grid item xs={12}>
          <p className={classes.titleText}>See all your packages in one place, make an account today!</p>
        </Grid>
        <Grid item xs={12}>
          <Link to="/register" style={{textDecoration: 'none'}}>
            <Button variant="contained" className={classes.subButton}>Create an Account</Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}

export default AnonHome