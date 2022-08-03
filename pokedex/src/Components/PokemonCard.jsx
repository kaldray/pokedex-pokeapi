import React from "react";
import { useEffect, useState } from "react";
import { extractId, checkIndex } from "../functions";
import { Link } from "react-router-dom";
import { AddToPokedex } from "../Components/AddToPokedex";
import { useSelector, useDispatch } from "react-redux";
import { addToPokdex, removeFromPokdex } from "../store/reducers/pokedex";

export const PokemonCard = ({ pokemon }) => {
  const [id, setID] = useState();
  const [imageUrl, setimageURL] = useState("");
  const [isOnPokedex, setIsOnPokedex] = useState(false);
  const { name, url } = pokemon;
  const { pokemons } = useSelector((state) => state.pokemon);
  const dispatch = useDispatch();

  useEffect(() => {
    if (checkIndex(pokemons, pokemon) !== undefined) {
      setIsOnPokedex(true);
    }
    if (checkIndex(pokemons, pokemon) === undefined) {
      setIsOnPokedex(false);
    }
  }, [pokemons]);

  useEffect(() => {
    setID(extractId(url));
    if (id !== undefined) {
      setimageURL(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      );
    }
  }, [id]);

  function addOrRemoveFromPokedex(pokemonInfo) {
    if (isOnPokedex === false) {
      dispatch(addToPokdex(pokemonInfo));
    } else {
      dispatch(removeFromPokdex(pokemonInfo));
    }
  }

  return (
    <>
      {imageUrl && (
        <div className="card">
          <img width="100px" height="100px" src={imageUrl}></img>
          <div>
            <p>{name}</p>
            <AddToPokedex
              isOnPokedex={isOnPokedex}
              addOrRemoveFromPokedex={addOrRemoveFromPokedex}
              pokemon={pokemon}
            />
          </div>
          <Link to={`/details/${id}`}>
            <button>Voir la fiche du pokémon.</button>
          </Link>
        </div>
      )}
    </>
  );
};
