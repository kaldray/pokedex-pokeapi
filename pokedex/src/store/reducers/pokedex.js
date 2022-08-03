import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemons: [],
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: initialState,
  reducers: {
    addToPokdex: (state, action) => {
      state.pokemons.push(action.payload);
    },
    removeFromPokdex: (state, action) => {
      state.pokemons = state.pokemons.filter(({ name }) => {
        return name !== action.payload.name;
      });
    },
  },
});

export const { addToPokdex, removeFromPokdex } = pokemonSlice.actions;

export default pokemonSlice.reducer;
