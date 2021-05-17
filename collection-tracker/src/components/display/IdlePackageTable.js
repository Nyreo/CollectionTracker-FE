import React from 'react';

// styles
import { makeStyles, withStyles } from '@material-ui/core/styles';
import colourTheme from '../../styles/theme';

// mui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@material-ui/core';

// mui - icons
import FlagIcon from '@material-ui/icons/Flag';

const useRowStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    '&:hover': {
      backgroundColor: 'whitesmoke',
    },
  },
  flagged: {
    color: '#E94D4D',
    marginRight: 10,
  },
  trackingId: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex'
    }
  },
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
}));

function Row({ data }) {

  const rowClasses = useRowStyles();

  const now = (new Date()).getTime()
  const rawElapsedTime = now - data.date
  const hourTime = 60 * 60 * 1000
  const allowedTime = 48

  const elapsedHours = Math.floor(rawElapsedTime / hourTime)

  const flagged = elapsedHours >= allowedTime

  return (
    <TableRow className={rowClasses.root}>
      <TableCell className={rowClasses.trackingId}>
        {flagged && (
          <Tooltip title="Waiting too long" aria-label="add">
            <FlagIcon className={rowClasses.flagged} />
          </Tooltip>
        )}
        {data._id}
      </TableCell>
      {/* long string */}
      <TableCell className={rowClasses.noMobile}>
        {(new Date(data.date)).toLocaleString()}
      </TableCell>
      {/* short string */}
      <TableCell className={rowClasses.noDesktop}>
        {(new Date(data.date)).toLocaleDateString()}
      </TableCell>
      <TableCell>
        {elapsedHours}
      </TableCell>
    </TableRow>
  );
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: colourTheme.primary.main,
    color: theme.palette.common.white,
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      lineHeight: 1,
    }
  }
}))(TableCell);

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

const generateRows = (idleData) => {

  return idleData.map(p =>
  (
    <Row key={`idlep.${p._id}`} data={p} />
  )
  )
}

export default function IdlePackageTable({ data }) {

  const classes = useTableStyles()

  return (
    <>
      <Typography variant='body1' className={classes.desc}>Table representing idle packages (not assigned to a driver).</Typography>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader aria-label="collapsible table" size='small'>
          <TableHead>
            <TableRow style={{ backgroundColor: colourTheme.primary.main }}>
              <StyledTableCell>Tracking No.</StyledTableCell>
              <StyledTableCell>Date Posted</StyledTableCell>
              <StyledTableCell>Hours Elapsed</StyledTableCell>
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
