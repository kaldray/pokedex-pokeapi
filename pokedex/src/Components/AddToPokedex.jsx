import React from "react";
import { useDispatch } from "react-redux";

import { ReactComponent as PokeballFull } from "../assets/pokeballFull.svg";
import { ReactComponent as PokeballEmpty } from "../assets/pokeballEmpty.svg";

import { openModal } from "../store/reducers/modal";
import { addToPokdex } from "../store/reducers/pokedex";
import { addToLocalStorage } from "../functions";

export const AddToPokedex = ({ isOnPokedex, pokemon }) => {
  const dispatch = useDispatch();

  const style = {
    height: "20px",
    width: "20px",
    cursor: "pointer",
  };

  function openTheModal() {
    dispatch(openModal(pokemon));
  }

  function addToPokedexPage(pokemonInfo) {
    dispatch(addToPokdex(pokemonInfo));
    addToLocalStorage(pokemonInfo);
  }

  return (
    <>
      {isOnPokedex === false && (
        <PokeballEmpty
          onClick={() => addToPokedexPage(pokemon)}
          style={style}
        />
      )}
      {isOnPokedex === true && (
        <>
          <PokeballFull onClick={openTheModal} style={style} />
        </>
      )}
    </>
  );
};
