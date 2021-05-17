import React from 'react';

// styles
import { makeStyles } from '@material-ui/core'
// import useStyles from '../../../styles/style'

// home factory
import HomeFactory from '../../Factories/HomeFactory';

const customStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  }
}))

const Home = ({ token, updateNotification, history }) => {

  const customClasses = customStyles();

  return (
    <div className={customClasses.root}>
      <HomeFactory
        token={token}
        updateNotification={updateNotification}
        history={history}
        userType={token ? token.userDetails.userType : ''}
      />

    </div>
  )
}

export default Home