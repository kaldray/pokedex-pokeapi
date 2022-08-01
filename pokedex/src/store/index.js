import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./reducers/pokemon";
export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});
