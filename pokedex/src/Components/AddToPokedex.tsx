import { ReactComponent as PokeballFull } from "../assets/pokeballFull.svg";
import { ReactComponent as PokeballEmpty } from "../assets/pokeballEmpty.svg";

import { openModal } from "../store/reducers/modalReducer";
import { useAppDispatch } from "../store/hooks";
import { addToPokdex } from "../store/reducers/pokedexReducer";
import { addToLocalStorage } from "../functions";
import { AddToPokedexProps, NamedAPIResource } from "types";

export const AddToPokedex = ({ isOnPokedex, pokemon }: AddToPokedexProps) => {
  const dispatch = useAppDispatch();

  const style = {
    height: "20px",
    width: "20px",
    cursor: "pointer",
  };

  function openTheModal() {
    dispatch(openModal(pokemon));
  }

  function addToPokedexPage(pokemonInfo: NamedAPIResource) {
    dispatch(addToPokdex(pokemonInfo));
    addToLocalStorage(pokemonInfo);
  }

  return (
    <>
      {isOnPokedex === false && (
        <PokeballEmpty onClick={() => addToPokedexPage(pokemon)} style={style} />
      )}
      {isOnPokedex === true && (
        <>
          <PokeballFull onClick={openTheModal} style={style} />
        </>
      )}
    </>
  );
};
