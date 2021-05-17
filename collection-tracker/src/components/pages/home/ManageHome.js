import React, { Suspense } from 'react'
import clsx from 'clsx';

// modules
import { getGroupedPackages } from "../../../modules/packageHandler";

// mui
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

// mui-icons
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

// styles
import colourTheme from '../../../styles/theme';
import useStyles from '../../../styles/style';
import { makeStyles, withStyles } from '@material-ui/core/styles';

// custom components
import TabFactory from '../../Factories/TabFactory';
const renderLoader = () => <p>Loading</p>;



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
  dataDisplay: {
    minHeight: 0,
    flex: '1',
    position: 'relative',
    paddingBottom: theme.spacing(2),
  },

  paper: {
    position: 'relative',
    height: '100%',
  },

  dataTable: {
    height: '100%',
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
  intro: {
    flexBasis: '10%',
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

// custom styled tab group
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

// custom styled tabs (individual)
const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#22222',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '1rem',
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);


// fetching and processing the courier data for all couriers
const fetchCourierData = async (setLoading, setCourierInfo, token) => {
  setLoading(true);

  const { data, error } = await getGroupedPackages(token.authHeader)

  if (error) console.log(error)

  console.log("RECEIVED DATA")

  const info = {}

  // undelivered
  info['undelivered'] = courierStats(data.groupedPackages);

  

  info['idle'] = data.idlePackages.sort((el1, el2) => {
    if (el1.date >= el2.date) return -1
    else if (el1.date < el2.date) return 1
    return 0
  })

  info['delivered'] = data.deliveredPackages.sort((el1, el2) => {
    if (el1.deliveryDetails.time >= el2.deliveryDetails.time) return -1
    else if (el1.deliveryDetails.time < el2.deliveryDetails.time) return 1
    return 0
  })

  console.log(info['delivered']);

  setCourierInfo(info);

  setLoading(false)
}

const courierStats = courierInfo => {

  const cstats = []

  for (const courier of Object.keys(courierInfo)) {
    cstats.push(
      {
        courier,
        undelivered: courierInfo[courier].filter(p => p.status === "in-transit")
      }
    )
  }

  return cstats
}

export default function ManagerHome({ token }) {

  // styles
  const classes = useStyles();
  const customClasses = customStyles();

  const [currentTab, setCurrentTab] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [courierInfo, setCourierInfo] = React.useState(null);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // onload, fetch courier data, check for updates
  React.useEffect(() => {
    fetchCourierData(setLoading, setCourierInfo, token)
  }, [token])

  return (
    <div className={classes.fluidContainer} style={{ height: '90vh' }}>
      <Grid className={clsx(classes.flex, classes.flexCol, customClasses.root)}>
        <Grid className={customClasses.intro} item xs={12}>
          <Typography variant="h1" className={customClasses.title}>Manager Homepage</Typography>
          <Typography variant="subtitle1" className={customClasses.subTitle}>Providing the tools needed to aid your managerial role.</Typography>
        </Grid>
        <Grid className={customClasses.dataDisplay} item xs={12}>
          <Paper className={clsx(customClasses.paper, classes.shadow)}>
            {loading && (
              <Box className={classes.loading}>
                <CircularProgress />
                <Typography>Loading Data.</Typography>
              </Box>
            )}
            <Grid className={customClasses.dataTable}>
              <Grid item xs={12}>
                {/* desktop tabs */}
                <div className={`${customClasses.tabHeader} ${customClasses.sectionDesktop}`}>
                  <StyledTabs
                    value={currentTab}
                    onChange={handleChange}
                    aria-label="styled tabs example">
                    <StyledTab icon={<LocalShippingIcon />} className={customClasses.tabText} label="Couriers" />
                    <StyledTab icon={<QueryBuilderIcon />} className={customClasses.tabText} label="Idle Packages" />
                    <StyledTab icon={<AssignmentTurnedInIcon />} className={customClasses.tabText} label="Delivered Packages" />
                  </StyledTabs>
                </div>
                {/* mobile tabs */}
                <div className={`${customClasses.tabHeader} ${customClasses.sectionMobile}`}>
                  <StyledTabs variant="fullWidth" value={currentTab} onChange={handleChange} aria-label="styled tabs example">
                    <StyledTab icon={<LocalShippingIcon />} className={customClasses.tabText} />
                    <StyledTab icon={<QueryBuilderIcon />} className={customClasses.tabText} />
                    <StyledTab icon={<AssignmentTurnedInIcon />} className={customClasses.tabText} />
                  </StyledTabs>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.defPadding}>
                  <Suspense fallback={renderLoader()}>
                    {courierInfo && <TabFactory
                      currentTab={currentTab}
                      courierInfo={courierInfo}
                    />
                    }
                  </Suspense>
                </div>

              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
