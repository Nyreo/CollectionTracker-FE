import React from 'react'

import { getGroupedPackages } from '../../modules/apiManager';

import Paper from '@material-ui/core/Paper'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

// icons
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
    height: '65vh',
    minHeight: '65vh',
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: "translate(-50%, -50%)",
  },
  padding: {
    padding: theme.spacing(3),
  },
  tabHeader: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(1),
    maxWidth: '100%',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8em',
      flex: "1 1 100%",
    }
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
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    height: '100%',
  },
}));


const renderDisplay = (currentTab, courierInfo) => {

  switch(currentTab) {
    case 0:
      return <CourierTable data={courierInfo.undelivered}/>
    case 1:
      return <IdlePackageTable data={courierInfo.idle} />
    case 2:
      return <DeliveredPackagesTable data={courierInfo.delivered}/>
    default:
      return null
  }
}

const fetchCourierData = async (setLoading, setCourierInfo, token) => {
  setLoading(true);
  
  const {data, error} = await getGroupedPackages(token.authHeader)

  if(error) console.log(error)

  console.log("RECEIVED DATA")

  const info = {}

  // undelivered
  info['undelivered'] = courierStats(data.groupedPackages);

  info['idle'] = data.idlePackages.sort((el1, el2) => {
    if(el1.date >= el2.date) return -1
    else if(el1.date < el2.date) return 1
    return 0
  })
  
  info['delivered'] = data.deliveredPackages.sort((el1, el2) => {
    if(el1.date >= el2.date) return -1
    else if(el1.date < el2.date) return 1
    return 0
  })
  
  console.log(info);

  setCourierInfo(info);

  setLoading(false)
}

const courierStats = courierInfo => {

  const cstats = []
  
  for(const courier of Object.keys(courierInfo)) {
    cstats.push(
      {
        courier,
        undelivered: courierInfo[courier].filter(p => p.status === "in-transit")
      }
    )
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
    fetchCourierData(setLoading, setCourierInfo, token)
  }, [token])

  return (
    <>
    <div className={classes.intro}>
      <h1 className={classes.title}>Manager Homepage</h1>
    </div>
    
    <Paper style={{position: 'relative'}}>
      { loading && (
        <Box className={classes.loading}>
          <CircularProgress/>
          <Typography>Loading Data.</Typography>
        </Box>
      )}
      <Grid className={classes.root}>
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
          </div>
        </Grid>
        <Grid item xs={12}>
          <Container style={{maxHeight: '50vh'}}>
            { courierInfo ? renderDisplay(currentTab, courierInfo) : null }
          </Container>
        </Grid>
      </Grid>
      
      
    </Paper>
    </>
  )
}
