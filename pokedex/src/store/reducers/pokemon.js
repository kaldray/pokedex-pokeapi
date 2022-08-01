import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: initialState,
  reducers: {
    addToPokdex: (state, action) => {
      return initialState;
    },
  },
});

export const { addToPokdex } = pokemonSlice.actions;

export default pokemonSlice.reducer;
