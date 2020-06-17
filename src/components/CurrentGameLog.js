import React, { useState } from 'react';
import { connect } from 'react-redux';
import CurrentTenTable from './CurrentTenTable';
import styled from 'styled-components';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { colors } from './theme';
import InputBase from '@material-ui/core/InputBase';
const OutlinedInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: '#212121',
    border: '1px solid gray',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),

    '&:hover': {
      borderColor: 'white',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);
const CurrentGameLog = ({ player }) => {
  const playerId = player.map((player) => player.player.playerInfo.id);
  console.log(playerId);
  const {
    player: { currentTen },
  } = player[0];

  const [gameLog, setGameLog] = useState({
    current: currentTen,
    color: colors[playerId.indexOf(currentTen[0].player.id)],
  });

  const handleChange = (e) => {
    console.log(e.target.value[0]);
    setGameLog({
      current: e.target.value,
      color: colors[playerId.indexOf(e.target.value[0].player.id)],
    });
  };

  return (
    <LogContainer>
      <HeaderContainer>
        <h1
          style={{
            color: '#e5e8e9',
            fontFamily:
              '"Rajdhani", "Roboto", "Helvetica", "Arial", "sans-serif"',
            fontWeight: 400,
            fontSize: '37px',
          }}
        >
          LAST TEN GAMES
        </h1>
        <FormControl variant="outlined" style={{ paddingLeft: '10px' }}>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={gameLog.current}
            onChange={handleChange}
            input={<OutlinedInput labelWidth={2} notched={false} />}
            style={{ color: gameLog.color, backgroundColor: '#212121' }}
          >
            {player.map((player) => (
              <MenuItem value={player.player.currentTen}>
                {player.player.playerInfo.first_name}{' '}
                {player.player.playerInfo.last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </HeaderContainer>
      <CurrentTenTable currentTen={gameLog.current} />
      {/* <h1>asdasd</h1> */}
    </LogContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;
const LogContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 70px;
`;
const mapStatetoProps = (state, ownProps) => {
  return { player: state };
};
export default connect(mapStatetoProps, null)(CurrentGameLog);
