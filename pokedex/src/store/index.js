import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./reducers/pokedex";
import modalReducer from "./reducers/modal";
export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    modal: modalReducer,
  },
});
