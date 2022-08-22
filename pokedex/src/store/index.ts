import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./reducers/pokedexReducer";
import modalReducer from "./reducers/modalReducer";
import responseHanfler from "./reducers/responseReducer";
export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    modal: modalReducer,
    loader: responseHanfler,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
