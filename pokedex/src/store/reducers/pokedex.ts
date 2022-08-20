import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "../index";

import { PokemonInitialState } from "types";

const initialState: PokemonInitialState = {
  pokemons: JSON.parse(localStorage.getItem("pokedex") || "") ?? [],
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
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default pokemonSlice.reducer;
