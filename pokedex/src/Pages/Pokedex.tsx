import { useRef } from "react";

import { PokemonCard, NavBar, Modal } from "../Components";

import { useAppSelector } from "../store/hooks";

export const Pokedex = () => {
  const { pokedex } = useAppSelector((state) => state.pokedex);
  const navRef = useRef(null);
  const pokedexList = useRef(null);

  return (
    <>
      <NavBar navRef={navRef} />
      <Modal navRef={navRef} htmlRef={pokedexList} />
      <section ref={pokedexList} className="container__list top">
        {pokedex && pokedex.map((pokemon) => <PokemonCard key={pokemon.name} pokemon={pokemon} />)}
      </section>
    </>
  );
};
