import { makeStyles } from '@material-ui/core/styles';
import colourTheme from './theme'

// standard styling across pages

const useStyles = makeStyles((theme) => ({

  // mobile
  noMobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  noDesktop: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  // sizing
  noPadding: {
    padding: 0,
  },

  noMargin: {
    margin: 0,
  },

  defPadding: {
    padding: theme.spacing(2),
  },

  // containers
  container75: {
    maxHeight: '75vh',
    height: '100%',
  },

  fluidContainer: {
    height: '100%',
  },

  // flex
  flex: {
    display: 'flex',
  },
  flexCol: {
    flexDirection: 'column',
  },
  flexRow: {
    flexDirection: 'row',
  },
  grow: {
    flexGrow: 1
  },
  flexCenter: {
    alignItems: 'center',
  },

  // flex item
  flexFill: {
    flex: '1 1 auto',
  },

  // styling
  shadow: {
    boxShadow: '7px 7px 5px 0px rgba(0,0,0,0.22)',
  },
  rounded: {
    borderRadius: '5px',
  },

  // links
  link: {
    textDecoration: 'none',
    color: colourTheme.link.main,
    fontWeight: 700,
  },

  // buttons
  linearBtnGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  defBtn: {
    fontSize: "1.3em",
    margin: "20px auto",
    textTransform: "capitalize",
    color: "whitesmoke",
    textDecoration: 'none',
    backgroundColor: colourTheme.primary.main,
    "&:hover": {
      backgroundColor: colourTheme.primary.hover
    },
    fontWeight: 700,
    borderRadius: "10px",
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.3em',
    },
  },
  altBtn: {
    fontSize: "1.3em",
    margin: "20px auto",
    backgroundColor: 'white',
    color: colourTheme.text.main,
    borderRadius: "10px",
    border: `4px solid ${colourTheme.primary.main}`
  },
  inverseBtn: {
    fontSize: "1.3em",
    margin: "20px auto",
    textTransform: "capitalize",
    color: colourTheme.primary.main,
    textDecoration: 'none',
    backgroundColor: 'whitesmoke',
    fontWeight: 700,
    borderRadius: "10px",
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.3em',
    },
  },

  // titles
  sectionTitleInverse: {
    color: 'whitesmoke',
    fontWeight: 700,
    fontSize: '2em',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  // loading default
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: "translate(-50%, -50%)",
    color: colourTheme.primary.main,
    fontWeight: 700,
  },
}))

export default useStyles;