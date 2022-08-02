import React from "react";
import { NavBar } from "../Components";
import { useSelector } from "react-redux";
import { PokemonCard } from "../Components";
export const Pokedex = () => {
  const pokemon = useSelector((state) => state.pokemon);

  return (
    <>
      <NavBar />
      <section className="container__list top">
        {pokemon &&
          pokemon.map(
            (pokemon) => (
              console.log(pokemon),
              (<PokemonCard key={pokemon.name} pokemon={pokemon} />)
            )
          )}
      </section>
    </>
  );
};
