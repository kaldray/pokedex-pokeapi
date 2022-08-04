import React from "react";
import { useSelector } from "react-redux";

import { PokemonCard, NavBar } from "../Components";

export const Pokedex = () => {
  const { pokemons } = useSelector((state) => state.pokemon);

  return (
    <>
      <NavBar />
      <section className="container__list top">
        {pokemons &&
          pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
      </section>
    </>
  );
};
