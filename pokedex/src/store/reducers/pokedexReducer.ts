import { createSlice } from "@reduxjs/toolkit";

import { NamedAPIResource, PokemonInitialState } from "../../types";

const storageLocal = localStorage.getItem("pokedex");
let parsedLocalStorage: NamedAPIResource[] = [];
if (typeof storageLocal === "string") {
  parsedLocalStorage = JSON.parse(storageLocal);
}

const initialState: PokemonInitialState = {
  pokedex: parsedLocalStorage ?? [],
};

export const pokemonSlice = createSlice({
  name: "pokedex",
  initialState: initialState,
  reducers: {
    addToPokdex: (state, action) => {
      state.pokedex.push(action.payload);
    },
    removeFromPokdex: (state, action) => {
      state.pokedex = state.pokedex.filter(({ name }) => {
        return name !== action.payload.name;
      });
    },
  },
});

export const { addToPokdex, removeFromPokdex } = pokemonSlice.actions;

export default pokemonSlice.reducer;
