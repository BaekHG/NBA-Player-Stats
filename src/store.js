import { createStore } from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

const PLAYER = 'PLAYER';

const playerInfo = createSlice({
  name: 'PlayerReducer',
  initialState: [],
  reducers: {
    addPlayer: (state, action) => {
      console.log(state);
      state.push({ player: action.payload });
    },
    deletePlayer: (state, action) => {
      return state.filter(
        (index) => action.payload !== parseInt(index.player.playerInfo.id)
      );
    },
    deleteAllPlayer: () => {
      return [];
    },
  },
});
const store = configureStore({ reducer: playerInfo.reducer });

export const { addPlayer, deletePlayer, deleteAllPlayer } = playerInfo.actions;
export default store;
