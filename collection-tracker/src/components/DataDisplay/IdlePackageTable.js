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

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  flagged: {
    color: '#E94D4D',
    marginRight: 10,
  }
});

function Row({data}) {
  const classes = useRowStyles();

  const now = (new Date()).getTime()
  const rawElapsedTime = now - data.date
  const allowedTime = 48 * 60 * 60 * 1000

  const elapsedTime = new Date(rawElapsedTime).toISOString().substr(11, 8)

  const flagged = rawElapsedTime >= allowedTime

  return (
    <React.Fragment>
      <TableRow className={`${classes.root}`}>
        <TableCell>
          { flagged && (
            <Tooltip title="Waiting too long" aria-label="add">
              <FlagIcon className={classes.flagged}/>
          </Tooltip>
          )}
          {data._id}
        </TableCell>
        <TableCell>
          {(new Date(data.date)).toLocaleString()}
        </TableCell>
        <TableCell>
          {elapsedTime}
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
  },
  body: {
    fontSize: 14,
    fontWeight: 700,
  },
}))(TableCell);

const useTableStyles = makeStyles((theme) => ({
  tableContainer: {
    height: '60vh',
    maxHeight: '60vh',
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
