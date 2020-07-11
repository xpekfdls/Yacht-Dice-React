import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    padding: 4,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
}))(TableRow);

function createRowData(name, score1, score2) {
  return { name, score1, score2};
}

function createSytles(name, style) {
  return { name, style};
}

const rows = [
  createRowData('Aces', 1, 1),
  createRowData('Deuces', 8, 2),
  createRowData('Threes', 12, 9),
  createRowData('Fours', 4, 12),
  createRowData('Fives', 15, 15),
  createRowData('Sixes', 18, 24),
  createRowData('Subtotal', '58/63', '63/63'),
  createRowData('+35 Bonus', '+0', '+35'),
  createRowData('Choice', 29, 24),
  createRowData('4 of a Kind', 24, 22),
  createRowData('Full House', 22, 26),
  createRowData('S. Straight', 15, 15),
  createRowData('L. Straight', 30, 30),
  createRowData('Yacht', 50, 0),
  createRowData('Total', 228, 180),
];

const useStyles = makeStyles({
  table: {
  },
});


export default function YachtScoreBoard() {
  const classes = useStyles();

  return (    
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table" wrapperStyle={{maxHeight:window.innerHeight}}>
        <TableHead>
          <TableRow>
            <StyledTableCell style={{backgroundColor: "#434543", color: 'white', fontWeight: 'bold', fontSize: 24}}>Turn 1/12</StyledTableCell>
            <StyledTableCell style={{backgroundColor: "#434543" , fontSize: 18}} align="center">BlackTree</StyledTableCell>
            <StyledTableCell style={{backgroundColor: "#434543" , fontSize: 18}} align="center">전원</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            (row.name == "Total")
            ?
                <StyledTableRow key={row.name}>
                <StyledTableCell style={{backgroundColor:"#434543", color: 'white',fontWeight: 'bold', fontSize: 18}} component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell style={{backgroundColor:"white",color: 'black', fontSize: 30}} align="center">{row.score1}</StyledTableCell>
                <StyledTableCell style={{backgroundColor:"#ebc55e", color: 'black', fontSize: 30}} align="center">{row.score2}</StyledTableCell>
                </StyledTableRow>
            :(row.name == "Subtotal")?
                <StyledTableRow key={row.name}>
                <StyledTableCell style={{backgroundColor:"#434543", color: 'white', fontSize: 18}}  component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell style={{backgroundColor:"#606360", color: 'white', fontSize: 18}} align="center">{row.score1}</StyledTableCell>
                <StyledTableCell style={{backgroundColor:"#606360", color: 'white', fontSize: 18}} align="center">{row.score2}</StyledTableCell>
                </StyledTableRow>
            :(row.name == "+35 Bonus")?
                <StyledTableRow key={row.name}>
                <StyledTableCell style={{backgroundColor:"#434543", color: 'white', fontWeight: 'bold', fontSize: 18}} component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell style={{backgroundColor:"#606360", color: 'white', fontWeight: 'bold', fontSize: 30}} align="center">{row.score1}</StyledTableCell>
                <StyledTableCell style={{backgroundColor:"#606360", color: 'white', fontWeight: 'bold', fontSize: 30}} align="center">{row.score2}</StyledTableCell>
                </StyledTableRow>
            :
                <StyledTableRow key={row.name}  hover={true}>
                <StyledTableCell  style={{fontSize: 20}} component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center" style={{fontWeight: 'bold', fontSize: 24}}>{row.score1}</StyledTableCell>
                <StyledTableCell align="center" style={{ backgroundColor:"#ebc55e",fontWeight: 'bold', fontSize: 24}}>{row.score2}</StyledTableCell>
                </StyledTableRow>

          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}