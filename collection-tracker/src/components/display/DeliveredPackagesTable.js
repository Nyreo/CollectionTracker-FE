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
import { Typography } from '@material-ui/core';

const useRowStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    '&:hover': {
      backgroundColor: 'whitesmoke',
    },
  },
  // mobile
  noMobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

function Row({ data }) {
  const rowClasses = useRowStyles();

  return (
    <TableRow className={rowClasses.root}>
      <TableCell>
        {data._id}
      </TableCell>
      <TableCell>
        {data.recpName}
      </TableCell>
      <TableCell className={rowClasses.noMobile}>
        {data.deliveryDetails.handedTo}
      </TableCell>
      <TableCell>
        {data.address}
      </TableCell>
      <TableCell>
        {data.destPostcode}
      </TableCell>
      <TableCell className={rowClasses.noMobile}>
        {(new Date(data.deliveryDetails.time)).toLocaleString()}
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
    height: '65vh',
    maxHeight: 'inherit',
  },
  desc: {
    color: 'gray',
    textAlign: 'left',
    paddingBottom: theme.spacing(2),
  }
}))

const generateRows = (deliveredData) => {

  return deliveredData.map(p =>
  (
    <Row key={`delP.${p._id}`} data={p} />
  )
  )
}

export default function DeliveredPackagesTable({ data }) {

  const classes = useTableStyles();

  return (
    <>
      <Typography variant='body1' className={classes.desc}>Table representing recent deliveries sorted (most recent first).</Typography>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader aria-label="collapsible table" size='small'>
          <TableHead>
            <TableRow style={{ backgroundColor: colourTheme.primary.main }}>
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
    </>
  );
}
