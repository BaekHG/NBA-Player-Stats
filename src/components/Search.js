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
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  containter: {
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
    },
  },
  textField: {
    color: '#E2E5E7',
    backgroundColor: 'transparent',
    borderWidth: '1px',
  },
  paper: {
    position: 'absolute',
    width: '700px',
    maxHeight: 300,
    overflow: 'scroll',
    backgroundColor: '#212121',
    color: '#E2E5E7',
  },
});

const Search = ({ addToPlayer }) => {
  const classes = useStyles();
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
        // await getPlayerAvg(playerinfo);
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
        console.log(playerinfo, id);
        addToPlayer({ playerInfo: playerinfo, playerAvg: res.data.data[0] });
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
    return state.playerinfo.map((player, index) => (
      <MenuItem
        {...getItemProps({ item: player })}
        key={player.id}
        selected={highlightedIndex === index}
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
        <div
          className={classes.container}
          {...getRootProps({}, { suppressRefError: true })}
        >
          <TextField
            fullWidth
            InputProps={{
              ...getInputProps(),
              className: classes.textField,
            }}
            variant="outlined"
            placeholder="SEARCH FOR A PLAYER e.g. Lebron James"
          />
          <div {...getMenuProps()}>
            {isOpen && state.playerinfo.length > 0 ? (
              <Paper className={classes.paper} square>
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

const mapDispatchToProps = (dispatch) => {
  return {
    addToPlayer: (state) => dispatch(addPlayer(state)),
  };
};
export default connect(null, mapDispatchToProps)(Search);
