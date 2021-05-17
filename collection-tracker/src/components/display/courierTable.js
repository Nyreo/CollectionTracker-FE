import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

// styles
import colourTheme from '../../styles/theme'

// mui
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

// mui icons
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    '&:hover': {
      backgroundColor: 'whitesmoke',
    },
  },
  detailsHeader: {
    backgroundColor: 'white',
  },
  detailsTh: {
    fontWeight: 700,
  },
  noMobile: {
    [theme.breakpoints.down('sm')]: {
      display: "none"
    }
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1em',
    }
  },
  row: {
    margin: 0,
    padding: 0,
    '&:hover': {
      backgroundColor: 'whitesmoke',
    },
  },
}));

const useTableStyles = makeStyles((theme) => ({
  tableContainer: {
    height: '65vh',
    maxHeight: 'inherit',
  },
  noMobile: {
    [theme.breakpoints.down('sm')]: {
      display: "none"
    }
  },
  desc: {
    color: 'gray',
    textAlign: 'left',
    paddingBottom: theme.spacing(2),
  }
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: colourTheme.primary.main,
    color: theme.palette.common.white,
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    }
  },
  body: {
    fontSize: 14,
    fontWeight: 700,
  },
}))(TableCell);

const Row = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          {data.courier}
        </TableCell>
        <TableCell>{data.undelivered.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Typography className={classes.title} variant="h6" component="div">
                Undelivered Package(s)
              </Typography>
              <Table aria-label="courier-package-details">
                <TableHead className={`${classes.detailsHeader}`}>
                  <TableRow>
                    <TableCell className={classes.detailsTh}>Tracking No.</TableCell>
                    <TableCell className={classes.detailsTh}>Address</TableCell>
                    <TableCell className={classes.detailsTh}>Postcode</TableCell>
                    <TableCell className={`${classes.detailsTh} ${classes.noMobile}`}>Date Posted</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.undelivered.map(p => (
                    <TableRow className={classes.row} key={`undelievered.${p.date}`}>
                      <TableCell className={classes.collapseCell}>
                        {p._id}
                      </TableCell>
                      <TableCell className={classes.collapseCell}>{p.address}</TableCell>
                      <TableCell className={classes.collapseCell}>{p.destPostcode}</TableCell>
                      <TableCell className={`${classes.collapseCell} ${classes.noMobile}`}>{(new Date(p.date)).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const generateRows = (courierData) => {

  return courierData.map(courier => {
    return courier.undelivered.length > 0 ? (
      <Row
        key={`table${courier.courier}`}
        data={courier}
      />
    )
      :
      null
  })
}

export default function CourierTable({ data }) {

  const classes = useTableStyles()

  return (
    <>
      <Typography variant='body1' className={classes.desc}>Table representing each courier and their assigned packages.</Typography>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader aria-label="courier-table" size='small'>
          <TableHead >
            <TableRow style={{ backgroundColor: colourTheme.primary.main }}>
              <StyledTableCell />
              <StyledTableCell>Courier</StyledTableCell>
              <StyledTableCell>Packages</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {generateRows(data)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

}
