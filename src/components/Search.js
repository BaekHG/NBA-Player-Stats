import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { add, remove } from '../store';
import axios from 'axios';
import styled from 'styled-components';
import { debounce, isEmpty } from 'lodash';

import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  textField: {
    color: 'white',
    width: '1000px',
  },
});

const Search = ({ addToPlayer }) => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [state, setState] = useState([]);
  const onChange = (value) => {
    // setText(e.target.value);
    setText(value);
    executeSearch();
  };
  const executeSearch = debounce(async () => {
    if (isEmpty(text) || text.length < 3) return;
    getPlayer();
  }, 350);

  const myRef = React.useRef(null);

  const getPlayer = () => {
    axios
      .get(`https://www.balldontlie.io/api/v1/players?search=${text}`)
      .then(async (res) => {
        // const playerInfo = res.data.data[0];
        // await getPlayerStats(playerInfo);
        // console.log(res.data.data);
        setState({ playerinfo: res.data.data });
        console.log(state);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // addToPlayer(state);
    console.log(state.playerinfo);
    console.log(typeof state.playerinfo);
    console.log(state.playerinfo[0].first_name);
    setText('');
  };

  const renderSuggestions = () => {
    if (state.playerinfo === undefined) return;
    const render = state.playerinfo.map((player) => (
      <li>
        {player.first_name} {player.last_name} - {player.team.abbreviation}
      </li>
    ));
    return render;
  };
  const { playerinfo } = state;
  return (
    <Container>
      <Downshift
        id="downshift-simple"
        onInputValueChange={onChange}
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
          //   <form onSubmit={handleSubmit}>
          <div
            {...getRootProps(
              {
                //   ref: myRef,
                //   refKey: 'ref',
              },
              { suppressRefError: true }
            )}
          >
            <TextField
              fullWidth
              varient="outlined"
              className={classes.textField}
              type="text"
              value={text}
              InputProps={{
                ...getInputProps(),
                className: classes.textField,
              }}
              placeholder="SEARCH FOR A PLAYER e.g. Lebron James"
            />
            {/* <div {...getMenuProps()}>
              {isOpen && playerinfo.length > 0 ? (
                <Paper className={classes.paper} square>
                  {this.renderSuggestions({
                    highlightedIndex,
                    selectedItem,
                    getItemProps,
                  })}
                </Paper>
              ) : null}
            </div> */}
          </div>
          //   </form>
        )}
      </Downshift>
    </Container>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addToPlayer: (state) => dispatch(add(state)),
  };
};
export default connect(null, mapDispatchToProps)(Search);

const Div = styled.h2`
  color: white;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
