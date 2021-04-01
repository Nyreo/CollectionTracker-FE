import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import colourTheme from '../../styles/theme'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Tooltip from '@material-ui/core/Tooltip';

import FlagIcon from '@material-ui/icons/Flag';

const useRowStyles = makeStyles((theme) => ({
  flagged: {
    color: '#E94D4D',
    marginRight: 10,
  },
  trackingId: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex'
    }
  },
  noMobile: {
    [theme.breakpoints.down('sm')]: {
      display: "none"
    }
  },
  noDesktop: {
    [theme.breakpoints.up('md')]: {
      display: "none"
    }
  },
}));

function Row({data}) {
  const classes = useRowStyles();

  const now = (new Date()).getTime()
  const rawElapsedTime = now - data.date
  const dayTime = 24 * 60 * 60 * 1000
  const allowedTime = 2

  const elapsedDays = Math.floor(rawElapsedTime / dayTime)

  const flagged = elapsedDays >= allowedTime

  return (
    <React.Fragment>
      <TableRow className={`${classes.root}`}>
        <TableCell className={classes.trackingId}>
        { flagged && (
            <Tooltip title="Waiting too long" aria-label="add">
              <FlagIcon className={classes.flagged}/>
          </Tooltip>
          )}
          <span>{data._id}</span>
        </TableCell>
        <TableCell className={classes.noMobile}>
          {(new Date(data.date)).toLocaleString()}
        </TableCell>
        <TableCell className={classes.noDesktop}>
          {(new Date(data.date)).toLocaleDateString()}
        </TableCell>
        <TableCell>
          {elapsedDays > 1 ? `${elapsedDays} Days` : `>1 Day(s)`}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: colourTheme.primary.main,
    color: theme.palette.common.white,
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize : 12,
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
}));

const generateRows = (idleData) => {
  
  return idleData.map(p => 
    (
      <Row key={`idlep.${p._id}`} data={p} />
    )
  )
}

export default function IdlePackageTable({data}) {

  const classes = useTableStyles()

  return (
    <TableContainer className={classes.tableContainer}>
      <Table stickyHeader aria-label="collapsible table" size='small'>
        <TableHead>
          <TableRow style={{backgroundColor: colourTheme.primary.main}}>
            <StyledTableCell>Tracking No.</StyledTableCell>
            <StyledTableCell>Date Posted</StyledTableCell>
            <StyledTableCell>Time Elapsed</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {generateRows(data)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
