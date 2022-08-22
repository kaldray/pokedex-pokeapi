import { useRef } from "react";

import { PokemonCard, NavBar, Modal } from "../Components";

import { useAppSelector } from "../store/hooks";

export const Pokedex = () => {
  const { pokemons } = useAppSelector((state) => state.pokemon);
  const navRef = useRef(null);
  const pokedexList = useRef(null);

  return (
    <>
      <NavBar navRef={navRef} />
      <Modal navRef={navRef} htmlRef={pokedexList} />
      <section ref={pokedexList} className="container__list top">
        {pokemons &&
          pokemons.map((pokemon) => <PokemonCard key={pokemon.name} pokemon={pokemon} />)}
      </section>
    </>
  );
};
