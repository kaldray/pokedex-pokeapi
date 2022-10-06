import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { extractId, checkIndex } from "../functions";
import { AddToPokedex } from "../Components";
import { PokemonCardProps, Url } from "../types";
import { useAppSelector } from "../store/hooks";

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const [id, setID] = useState<Url>();
  const [imageUrl, setimageURL] = useState<Url>();
  const [isOnPokedex, setIsOnPokedex] = useState(false);
  const { name, url } = pokemon;
  const { pokedex } = useAppSelector((state) => state.pokedex);

  useEffect(() => {
    if (checkIndex(pokedex, pokemon) !== undefined) {
      setIsOnPokedex(true);
    }
    if (checkIndex(pokedex, pokemon) === undefined) {
      setIsOnPokedex(false);
    }
  }, [pokedex]);

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
          <img width="100px" height="100px" src={imageUrl} alt={name}></img>
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
