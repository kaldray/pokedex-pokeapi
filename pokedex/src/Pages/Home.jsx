import React, { useEffect, useState } from "react";
import { usePokeApi } from "../services";
import { PokemonCard } from "../Components";
import axios from "axios";

export const Home = () => {
  let { pokemons } = usePokeApi();
  const [pokemonData, setPokemonData] = useState();
  const [windowHeigth, setWindowHeigth] = useState();
  const [scrollPosition, setScrollPosition] = useState();
  const [nextResult, setNextResult] = useState();

  function getScrollPosition(e) {
    e.preventDefault();
    e.stopPropagation();
    const documentHeigth = Math.ceil(document.documentElement.scrollHeight);
    const windowHeight = Math.ceil(window.innerHeight);
    const scroll = Math.ceil(window.scrollY);
    setWindowHeigth(scroll);
    setScrollPosition(documentHeigth - windowHeight);
  }

  useEffect(() => {
    setPokemonData(pokemons?.results);
    setNextResult(pokemons?.next);
  }, [pokemons]);

  useEffect(() => {
    window.addEventListener("scroll", getScrollPosition);
    if (
      scrollPosition !== undefined &&
      nextResult !== undefined &&
      windowHeigth !== undefined &&
      windowHeigth >= scrollPosition
    ) {
      axios
        .get(nextResult)
        .then((response) => {
          return response;
        })
        .then((res) => {
          console.log(res.data.next);
          setNextResult(res.data.next);
          setPokemonData((prevState) => [...prevState, ...res.data.results]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => {
      window.removeEventListener("scroll", getScrollPosition);
    };
  }, [windowHeigth]);

  return (
    <>
      <div className="container__search">
        <input type="text" />
      </div>
      <section>
        {pokemonData &&
          pokemonData.map((pokemon, id) => {
            return <PokemonCard key={id} pokemon={pokemon} />;
          })}
      </section>
    </>
  );
};
