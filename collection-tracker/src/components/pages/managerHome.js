import React from 'react'

import { getCourierPackages } from '../../modules/apiManager';

import Paper from '@material-ui/core/Paper'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import colourTheme from '../../styles/theme';

import CourierTable from '../DataDisplay/courierTable';
import IdlePackageTable from '../DataDisplay/IdlePackageTable';
import DeliveredPackagesTable from '../DataDisplay/DeliveredPackagesTable';

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: colourTheme.primary.main,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: 'white',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  tabHeader: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(1),
    maxWidth: '100%',
    justifyContent: 'center',
  },
  tabText: {
    color: '#292929',
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
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    height: '100%',
  },
}));


const renderDisplay = (currentTab) => {

  // console.log("RENDERING");
  // console.log(courierInfo);

  switch(currentTab) {
    case 0:
      return <CourierTable />
    case 1:
      return <IdlePackageTable />
    case 2:
      return <DeliveredPackagesTable />
    default:
      return null
  }
}

const fetchCourierData = async (setLoading, token) => {
  setLoading(true);
  
  const {data, error} = await getCourierPackages(token.authHeader)

  if(error) console.log(error)
  else {
    console.log("RECEIVED DATA")

    const values = await Promise.all(Object.values(data));
    
    // get details
    const info = {}

    info['undelivered'] = courierStats(values);

    console.log(info);
  }
  setLoading(false)
}

const courierStats = courierInfo => {

  const cstats = []
  for(const info of courierInfo) {
    cstats.push({
      courier: info.courier,
      undelivered: info.data.filter(p => p.status === 'in-transit')
    })
  }
  return cstats
}

export default function ManagerHome({token}) {

  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [courierInfo, setCourierInfo] = React.useState(null);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  React.useEffect(() => {
    fetchCourierData(setLoading, token)
  }, [token])

  return (
    <>
    <div className={classes.intro}>
      <h1 className={classes.title}>Manager Homepage</h1>
    </div>
    { loading && (
      <p>Loading courier information...</p>
    )}
    <Paper>
      <Grid>
        <Grid item xs={12}>
          <div className={`${classes.tabHeader} ${classes.sectionDesktop}`}>
            <StyledTabs 
              value={currentTab} 
              onChange={handleChange} 
              aria-label="styled tabs example">
              <StyledTab icon={<LocalShippingIcon />} className={classes.tabText} label="Couriers" />
              <StyledTab icon={<QueryBuilderIcon />} className={classes.tabText} label="Idle Packages" />
              <StyledTab icon={<AssignmentTurnedInIcon />} className={classes.tabText} label="Delivered Packages" />
            </StyledTabs>
            <Typography className={classes.padding} />
          </div>
          <div className={`${classes.tabHeader} ${classes.sectionMobile}`}>
            <StyledTabs fullWidth variant="fullWidth" value={currentTab} onChange={handleChange} aria-label="styled tabs example">
              <StyledTab icon={<LocalShippingIcon />} className={classes.tabText}/>
              <StyledTab icon={<QueryBuilderIcon />} className={classes.tabText}/>
              <StyledTab icon={<AssignmentTurnedInIcon />} className={classes.tabText}/>
            </StyledTabs>
            <Typography className={classes.padding} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Container>
            {renderDisplay(currentTab)}
          </Container>
        </Grid>
      </Grid>
      
      
    </Paper>
    </>
  )
}
