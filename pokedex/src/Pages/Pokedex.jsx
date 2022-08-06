import React, { useRef } from "react";
import { useSelector } from "react-redux";

import { PokemonCard, NavBar, Modal } from "../Components";

export const Pokedex = () => {
  const { pokemons } = useSelector((state) => state.pokemon);
  const { pokemon } = useSelector((state) => state.modal);
  const pokedexList = useRef(null);

  return (
    <>
      <NavBar />
      <Modal htmlRef={pokedexList} pokemon={pokemon.pokemon} />
      <section ref={pokedexList} className="container__list top">
        {pokemons &&
          pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
      </section>
    </>
  );
};
