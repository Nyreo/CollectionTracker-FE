import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import colourTheme from '../../styles/theme'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useRowStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  noMobile: {
    [theme.breakpoints.down('sm')]: {
      display: "none"
    }
  },
}));

function Row({data}) {
  const classes = useRowStyles();
  
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {data._id}
        </TableCell>
        <TableCell>
          {data.recpName}
        </TableCell>
        <TableCell className={classes.noMobile}>
          {data.deliveryDetails.handedTo}
        </TableCell>
        <TableCell>
          {data.address}
        </TableCell>
        <TableCell>
          {data.destPostcode}
        </TableCell>
        <TableCell className={classes.noMobile}>
          {(new Date(data.deliveryDetails.time)).toLocaleString()}
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
  noMobile: {
    [theme.breakpoints.down('sm')]: {
      display: "none"
    }
  },
  tableContainer: {
    height: '60vh',
    maxHeight: '60vh',
  },
}))

const generateRows = (deliveredData) => {
  
  return deliveredData.map(p => 
    (
      <Row key={`delP.${p._id}`} data={p} />
    )
  )
}

export default function DeliveredPackagesTable({data}) {

  const classes = useTableStyles();

  return (
    <TableContainer className={classes.tableContainer}>
      <Table stickyHeader aria-label="collapsible table" size='small'>
        <TableHead>
          <TableRow style={{backgroundColor: colourTheme.primary.main}}>
            <StyledTableCell>Tracking No.</StyledTableCell>
            <StyledTableCell>Recipient Name</StyledTableCell>
            <StyledTableCell className={classes.noMobile}>Handed To</StyledTableCell>
            <StyledTableCell>Address</StyledTableCell>
            <StyledTableCell>Destination Postcode</StyledTableCell>
            <StyledTableCell className={classes.noMobile}>Date Delivered</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {generateRows(data)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
