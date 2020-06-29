import React, { useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const fontFamily = '"Rajdhani", "Roboto", "Helvetica", "Arial", "sans-serif"';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: '#a48b8b',
    fontFamily: fontFamily,
    fontWeight: 'bold',
    fontSize: 12,
  },
  body: {
    fontSize: 12,
    color: theme.palette.common.white,
    fontFamily: fontFamily,
    fontWeight: 500,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: 'gray',
    },
  },
}))(TableRow);

function createData(
  oop,
  min,
  fgm,
  fga,
  fg_pct,
  fg3m,
  fg3a,
  fg3_pct,
  fta,
  ft_pct,
  oreb,
  dreb,
  reb,
  ast,
  stl,
  blk,
  turnover,
  pf,
  pts
) {
  return {
    oop,
    min,
    fgm,
    fga,
    fg_pct,
    fg3m,
    fg3a,
    fg3_pct,
    fta,
    ft_pct,
    oreb,
    dreb,
    reb,
    ast,
    stl,
    blk,
    turnover,
    pf,
    pts,
  };
}

const useStyles = makeStyles({
  container: {
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
  },
  table: {
    width: '100%',
    height: '100%',
    minWidth: 700,
    backgroundColor: '#151515',
    color: 'white',
  },
});

export default function CustomizedTables({ currentTen }) {
  const classes = useStyles();
  const rows = currentTen.map((current) => {
    return createData(
      moment(current.game.date).format('MM-DD-YYYY'),
      current.min,
      current.fgm,
      current.fga,
      current.fg_pct,
      current.fg3m,
      current.fg3a,
      current.fg3_pct,
      current.fta,
      current.ft_pct,
      current.oreb,
      current.dreb,
      current.reb,
      current.ast,
      current.stl,
      current.blk,
      current.turnover,
      current.pf,
      current.pts
    );
  });
  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">DATE</StyledTableCell>
            <StyledTableCell align="center">MIN</StyledTableCell>
            <StyledTableCell align="center">FGM</StyledTableCell>
            <StyledTableCell align="center">FGA</StyledTableCell>
            <StyledTableCell align="center">FGPCT</StyledTableCell>
            <StyledTableCell align="center">FG3M</StyledTableCell>
            <StyledTableCell align="center">FG3A</StyledTableCell>
            <StyledTableCell align="center">FG3PCT</StyledTableCell>
            <StyledTableCell align="center">FTA</StyledTableCell>
            <StyledTableCell align="center">FTPCT</StyledTableCell>
            <StyledTableCell align="center">OREB</StyledTableCell>
            <StyledTableCell align="center">DREB</StyledTableCell>
            <StyledTableCell align="center">REB</StyledTableCell>
            <StyledTableCell align="center">AST</StyledTableCell>
            <StyledTableCell align="center">STL</StyledTableCell>
            <StyledTableCell align="center">BLK</StyledTableCell>
            <StyledTableCell align="center">TO</StyledTableCell>
            <StyledTableCell align="center">PF</StyledTableCell>
            <StyledTableCell align="center">PTS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.min}>
              <StyledTableCell align="center">{row.oop}</StyledTableCell>
              <StyledTableCell align="center">{row.min}</StyledTableCell>
              <StyledTableCell align="center">{row.fgm}</StyledTableCell>
              <StyledTableCell align="center">{row.fga}</StyledTableCell>
              <StyledTableCell align="center">{row.fg_pct}</StyledTableCell>
              <StyledTableCell align="center">{row.fg3m}</StyledTableCell>
              <StyledTableCell align="center">{row.fg3a}</StyledTableCell>
              <StyledTableCell align="center">{row.fg3_pct}</StyledTableCell>
              <StyledTableCell align="center">{row.fta}</StyledTableCell>
              <StyledTableCell align="center">{row.ft_pct}</StyledTableCell>
              <StyledTableCell align="center">{row.oreb}</StyledTableCell>
              <StyledTableCell align="center">{row.dreb}</StyledTableCell>
              <StyledTableCell align="center">{row.reb}</StyledTableCell>
              <StyledTableCell align="center">{row.ast}</StyledTableCell>
              <StyledTableCell align="center">{row.stl}</StyledTableCell>
              <StyledTableCell align="center">{row.blk}</StyledTableCell>
              <StyledTableCell align="center">{row.turnover}</StyledTableCell>
              <StyledTableCell align="center">{row.pf}</StyledTableCell>
              <StyledTableCell align="center">{row.pts}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
