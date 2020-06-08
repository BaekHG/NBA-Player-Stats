import { createStore } from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

const PLAYER = 'PLAYER';

const playerInfo = createSlice({
  name: 'PlayerReducer',
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ player: action.payload });
    },
    // remove: (state,action)=>
  },
});
const store = configureStore({ reducer: playerInfo.reducer });
console.log(store.getState());
export const { add, remove } = playerInfo.actions;
export default store;
