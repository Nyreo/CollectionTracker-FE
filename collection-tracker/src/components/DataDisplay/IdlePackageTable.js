import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import colourTheme from '../../styles/theme'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          Tracking
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.calories}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('Frozen yoghurt', 159),
  createData('Ice cream sandwich', 237),
  createData('Eclair', 262),
  createData('Cupcake', 305),
  createData('Gingerbread', 356),
  createData('Frozen yoghurt', 159),
  createData('asdfasdfadsfadsf', 237),
  createData('adsfadsfadfadfa', 262),
  createData('Cupadsfadsfacake', 305),
  createData('Ginadsfadfgerbread', 356),
  createData('Frasdfasdfozen yoghurt', 159),
  createData('Icasdfadfe cream sandwich', 237),
  createData('asdfadfa', 262),
  createData('Cuasdfadfpcake', 305),
  createData('Gingasdfadferbread', 356),
  createData('Frozen yoghurt', 159),
  createData('Ice cream sandwich', 237),
  createData('Eclair', 262),
  createData('Cupcake', 305),
  createData('Gingerbread', 356),
  createData('Frozen yoghurt', 159),
  createData('asdfasdfadsfadsf', 237),
  createData('adsfadsfadfadfa', 262),
  createData('Cupadsfadsfacake', 305),
  createData('Ginadsfadfgerbread', 356),
  createData('Frasdfasdfozen yoghurt', 159),
  createData('Icasdfadfe cream sandwich', 237),
  createData('asdfadfa', 262),
  createData('Cuasdfadfpcake', 305),
  createData('Gingasdfadferbread', 356),
];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: colourTheme.primary.main,
    color: theme.palette.common.white,
    fontWeight: 700,
    flex: 1,
  },
  body: {
    fontSize: 14,
    fontWeight: 700,
  },
}))(TableCell);

export default function IdlePackageTable() {
  return (
    <TableContainer>
      <Table stickyHeader aria-label="collapsible table" size='small'>
        <TableHead>
          <TableRow style={{backgroundColor: colourTheme.primary.main}}>
            <StyledTableCell>Tracking No.</StyledTableCell>
            <StyledTableCell fullWidth>Date Posted</StyledTableCell>
            <StyledTableCell fullWidth>Time Elapsed</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
