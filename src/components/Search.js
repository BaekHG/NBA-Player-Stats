import React, { useState, useEffect, useRef } from 'react';

import { addPlayer } from '../store';
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { debounce, isEmpty } from 'lodash';

import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderWidth: '2px',
        borderColor: 'green',
      },

      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
      '& .MuiOutlinedInput-input': {
        color: 'white',
        '&::placeholder': {
          color: 'white',
          fontWeight: '2px',
        },
      },
    },
  },
})(TextField);

const Search = ({ currentState, addToPlayer }) => {
  // const classes = useStyles();
  const [text, setText] = useState('');
  const [state, setState] = useState({
    playerinfo: [],
  });
  const onInputValueChange = (value) => {
    setText(value);
  };
  const executeSearch = debounce(async () => {
    if (isEmpty(text) || text.length < 3) return;
    getPlayer();
  }, 350);

  useEffect(() => {
    executeSearch();
    return () => {
      executeSearch.cancel();
    };
  }, [text]);
  const getPlayer = () => {
    axios
      .get(`https://www.balldontlie.io/api/v1/players?search=${text}`)
      .then(async (res) => {
        const playerinfo = res.data.data;

        setState({ playerinfo: res.data.data });
        //
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getPlayerAvg = (id, playerinfo) => {
    console.log(id);
    axios
      .get(
        `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`
      )
      .then((res) => {
        // console.log(playerinfo, id);

        const playerAvg = res.data.data[0];
        if (playerAvg === undefined) {
          alert(`This Player is eiterh injured or hasn't played yet`);
          return;
        }
        getGameLog(playerinfo, playerAvg, id);
        // addToPlayer({ playerInfo: playerinfo, playerAvg: res.data.data[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGameLog = (playerinfo, playerAvg, id) => {
    axios
      .get(
        `https://www.balldontlie.io/api/v1/stats?player_ids[]=${id}&seasons[]=2019&per_page=100`
      )
      .then(async (res) => {
        // const arr = res.data.data.map(data =>{
        //filetr
        if (currentState.length >= 1) {
          const check = currentState.find(
            (info) => info.player.playerInfo.id === id
          );
          if (check !== undefined) {
            console.log('exist id!!');
            return;
          }
        }
        const currentTen = res.data.data
          .sort((a, b) => new Date(b.game.date) - new Date(a.game.date))
          .slice(0, 10);

        console.log(currentTen);
        currentTen.map((current, index) => (current['index'] = index));

        console.log(currentTen);
        addToPlayer({
          playerInfo: playerinfo,
          playerAvg: playerAvg,
          currentTen,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const renderSuggestions = ({
    highlightedIndex,
    selectedItem,
    getItemProps,
  }) => {
    if (state.playerinfo === undefined) return;
    console.log(highlightedIndex);
    return state.playerinfo.map((player, index) => (
      <MenuItem
        {...getItemProps({ item: player })}
        key={player.id}
        // selected={highlightedIndex === index ? 'lightgray' : 'white'}
        component="div"
        style={{
          fontWeight: 400,
        }}
      >
        {player.first_name} {player.last_name} - {player.team.abbreviation}
      </MenuItem>
    ));
  };

  const onChange = (item) => {
    console.log(item, item.id);
    setText('');
    getPlayerAvg(item.id, item);
  };
  return (
    <Downshift
      id="downshift-simple"
      onInputValueChange={onInputValueChange}
      onChange={onChange}
      itemToString={(item) => (item ? item.name : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        highlightedIndex,
        isOpen,
        selectedItem,
        inputValue,
        clearSelection,
        getRootProps,
      }) => (
        <div {...getRootProps({}, { suppressRefError: true })}>
          <CssTextField
            fullWidth
            InputProps={{
              ...getInputProps(),
            }}
            variant="outlined"
            placeholder="SEARCH FOR A PLAYER e.g. Lebron James"
          />

          <div {...getMenuProps()}>
            {isOpen && state.playerinfo.length > 0 ? (
              <Paper
                style={{
                  position: 'absolute',
                  width: '700px',
                  maxHeight: 300,
                  overflow: 'scroll',
                  backgroundColor: '#212121',
                  color: '#E2E5E7',
                  // '&:hover': {
                  //   backgroundColor: 'white',
                  // },
                }}
                square
              >
                {renderSuggestions({
                  highlightedIndex,
                  selectedItem,
                  getItemProps,
                })}
              </Paper>
            ) : null}
          </div>
        </div>
      )}
    </Downshift>
  );
};
const mapStatetoProps = (state) => {
  return {
    currentState: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToPlayer: (state) => dispatch(addPlayer(state)),
  };
};

const Input = styled.input``;
export default connect(mapStatetoProps, mapDispatchToProps)(Search);
