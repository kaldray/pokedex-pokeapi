import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToPokdex, removeFromPokdex } from "../store/reducers/pokedex";

import { getPokemonAttributes } from "../services/pokemon";
import { NavBar, AddToPokedex } from "../Components";
import { checkIndex } from "../functions";

export const PokemonDetails = () => {
  const { id } = useParams();
  const { pokemonAttributes, pokemonEvolution, pokemonChracteritics } =
    getPokemonAttributes(id);
  const [attributes, setAttributes] = useState();
  const [pokemon, setPokemon] = useState();
  const [isOnPokedex, setIsOnPokedex] = useState(false);
  const { pokemons } = useSelector((state) => state.pokemon);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pokemonAttributes !== undefined) {
      const {
        types,
        stats,
        sprites: { front_default },
        name,
        height,
        weight,
        species,
      } = pokemonAttributes;
      setAttributes({ types, stats, front_default, name, height, weight });
      setPokemon(species);
    }
  }, [pokemonAttributes, pokemons]);

  useEffect(() => {
    if (attributes !== undefined) {
      if (checkIndex(pokemons, attributes) !== undefined) {
        setIsOnPokedex(true);
      }
      if (checkIndex(pokemons, attributes) === undefined) {
        setIsOnPokedex(false);
      }
    }
  }, [attributes]);

  function addOrRemoveFromPokedex(pokemonInfo) {
    if (isOnPokedex === false) {
      dispatch(addToPokdex(pokemonInfo));
    } else {
      dispatch(removeFromPokdex(pokemonInfo));
    }
  }

  return (
    <>
      <NavBar />
      <section className="container__unique top">
        <figure>
          <img src={attributes?.front_default} alt={attributes?.name} />
          <figcaption>{attributes?.name}</figcaption>
          <p>{pokemonChracteritics?.descriptions.at(7)?.description}</p>
          <AddToPokedex
            addOrRemoveFromPokedex={addOrRemoveFromPokedex}
            isOnPokedex={isOnPokedex}
            pokemon={pokemon}
          />
        </figure>
        <ul className="container__types">
          {attributes?.types.map((val) => (
            <li key={val.slot}>{val.type.name}</li>
          ))}
        </ul>
        <span>Statistiques</span>
        <ul className="container__stats">
          {attributes?.stats.map((val) => (
            <li key={val.stat?.name}>
              {val.stat?.name} : {val.base_stat}{" "}
            </li>
          ))}
        </ul>
        <span>Caractéritiques</span>
        <div>
          <p>height : {attributes?.height}</p>
          <p>weight : {attributes?.weight}</p>
        </div>
      </section>
    </>
  );
};
