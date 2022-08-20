import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./reducers/pokedex";
import modalReducer from "./reducers/modal";
export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
