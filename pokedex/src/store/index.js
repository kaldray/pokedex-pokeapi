import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./reducers/pokedex";
export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});
