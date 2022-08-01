import React, { useEffect } from "react";
import { usePokeApi } from "../services";
import { PokemonCard } from "../Components";

export const Home = () => {
  const { pokemons } = usePokeApi();
  console.log(pokemons);

  return (
    <>
      <section>
        {pokemons &&
          pokemons.results.map((pokemon, id) => {
            return <PokemonCard key={id} pokemon={pokemon} />;
          })}
      </section>
    </>
  );
};
