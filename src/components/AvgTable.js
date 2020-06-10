import React from 'react';
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
  },
  body: {
    fontSize: 14,
    color: theme.palette.common.white,
    fontFamily: fontFamily,
    fontWeight: 500,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }
function createData(
  min,
  pts,
  reb,
  ast,
  stl,
  blk,
  turnover,
  pf,
  pg_pct,
  fg3_pct,
  ft_pct,
  fgm,
  fga,
  fg3m,
  fg3a,
  gtm,
  fta,
  oreb,
  dreb
) {
  return {
    min,
    pts,
    reb,
    ast,
    stl,
    blk,
    turnover,
    pf,
    pg_pct,
    fg3_pct,
    ft_pct,
    fgm,
    fga,
    fg3m,
    fg3a,
    gtm,
    fta,
    oreb,
    dreb,
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

export default function CustomizedTables({ playerAvg }) {
  console.log(playerAvg);
  const classes = useStyles();
  const rows = [
    createData(
      playerAvg.min,
      playerAvg.min,
      playerAvg.pts,
      playerAvg.reb,
      playerAvg.ast,
      playerAvg.stl,
      playerAvg.blk,
      playerAvg.turnover,
      playerAvg.pf,
      playerAvg.fg_pct,
      playerAvg.fg3_pct,
      playerAvg.ft_pct,
      playerAvg.fgm,
      playerAvg.fga,
      playerAvg.fg3m,
      playerAvg.fg3a,
      playerAvg.ftm,
      playerAvg.fta,
      playerAvg.oreb,
      playerAvg.dreb
    ),
    // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //   createData('Eclair', 262, 16.0, 24, 6.0),
    //   createData('Cupcake', 305, 3.7, 67, 4.3),
    //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">MIN</StyledTableCell>
            <StyledTableCell align="center">PTS</StyledTableCell>
            <StyledTableCell align="center">REB</StyledTableCell>
            <StyledTableCell align="center">AST</StyledTableCell>
            <StyledTableCell align="center">STL</StyledTableCell>
            <StyledTableCell align="center">BLK</StyledTableCell>
            <StyledTableCell align="center">TURNOVER</StyledTableCell>
            <StyledTableCell align="center">PF</StyledTableCell>
            <StyledTableCell align="center">FG_PCT</StyledTableCell>
            <StyledTableCell align="center">FG3_PCT</StyledTableCell>
            <StyledTableCell align="center">FT_PCT</StyledTableCell>
            <StyledTableCell align="center">FGM&nbsp;</StyledTableCell>
            <StyledTableCell align="center">FGA&nbsp;</StyledTableCell>
            <StyledTableCell align="center">FG3M&nbsp;</StyledTableCell>
            <StyledTableCell align="center">FG3A&nbsp;</StyledTableCell>
            <StyledTableCell align="center">FTM</StyledTableCell>
            <StyledTableCell align="center">FTA&nbsp;</StyledTableCell>
            <StyledTableCell align="center">OREB&nbsp;</StyledTableCell>
            <StyledTableCell align="center">DREB&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center">{row.min}</StyledTableCell>
              <StyledTableCell align="center">{row.pts}</StyledTableCell>
              <StyledTableCell align="center">{row.reb}</StyledTableCell>
              <StyledTableCell align="center">{row.ast}</StyledTableCell>
              <StyledTableCell align="center">{row.stl}</StyledTableCell>
              <StyledTableCell align="center">{row.blk}</StyledTableCell>
              <StyledTableCell align="center">{row.turnover}</StyledTableCell>
              <StyledTableCell align="center">{row.pf}</StyledTableCell>
              <StyledTableCell align="center">{row.pg_pct}</StyledTableCell>
              <StyledTableCell align="center">{row.fg3_pct}</StyledTableCell>
              <StyledTableCell align="center">{row.ft_pct}</StyledTableCell>
              <StyledTableCell align="center">{row.fgm}</StyledTableCell>
              <StyledTableCell align="center">{row.fga}</StyledTableCell>
              <StyledTableCell align="center">{row.fg3m}</StyledTableCell>
              <StyledTableCell align="center">{row.fg3a}</StyledTableCell>
              <StyledTableCell align="center">{row.gtm}</StyledTableCell>
              <StyledTableCell align="center">{row.fta}</StyledTableCell>
              <StyledTableCell align="center">{row.oreb}</StyledTableCell>
              <StyledTableCell align="center">{row.dreb}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
