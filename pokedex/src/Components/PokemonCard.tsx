import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { extractId, checkIndex } from "../functions";
import { AddToPokedex } from "../Components";
import { PokemonCardProps, Url } from "types";
import { useAppSelector } from "../store/reducers/pokedex";

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const [id, setID] = useState<Url>();
  const [imageUrl, setimageURL] = useState<Url>();
  const [isOnPokedex, setIsOnPokedex] = useState(false);
  const { name, url } = pokemon;
  const { pokemons } = useAppSelector((state) => state.pokemon);

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
