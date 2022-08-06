import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { extractId, checkIndex } from "../functions";
import { AddToPokedex } from "../Components";

export const PokemonCard = ({ pokemon }) => {
  const [id, setID] = useState();
  const [imageUrl, setimageURL] = useState("");
  const [isOnPokedex, setIsOnPokedex] = useState(false);
  const { name, url } = pokemon;
  const { pokemons } = useSelector((state) => state.pokemon);

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

  return (
    <>
      {imageUrl && (
        <div className="card">
          <img width="100px" height="100px" src={imageUrl}></img>
          <div>
            <p>{name}</p>
            <AddToPokedex isOnPokedex={isOnPokedex} pokemon={pokemon} />
          </div>
          <Link to={`/details/${id}`}>
            <button>Voir la fiche du pokémon.</button>
          </Link>
        </div>
      )}
    </>
  );
};
