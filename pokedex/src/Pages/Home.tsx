import { useEffect, useState, useRef } from "react";
import axios from "axios";

import { fetchPokeApi } from "../services";
import { PokemonCard, NavBar, Modal, Loader, GoPageTop } from "../Components";
import { NamedAPIResource, Url } from "types";
import { useAppSelector } from "../store/hooks";

export const Home = () => {
  fetchPokeApi();
  const [pokemonData, setPokemonData] = useState<Array<NamedAPIResource>>();
  const [filterPokemonData, setFilterPokemonData] = useState<Array<NamedAPIResource>>();
  const [windowHeigth, setWindowHeigth] = useState<number>();
  const [scrollPosition, setScrollPosition] = useState<number>();
  const [nextResult, setNextResult] = useState<Url>();
  const inputValue = useRef<HTMLInputElement>(null);
  const pokemonList = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const { isLoading, pokeApi, message } = useAppSelector((state) => state.loader);

  function getScrollPosition(e: Event) {
    e.preventDefault();
    const documentHeigth = Math.ceil(document.documentElement.scrollHeight);
    const windowHeight = Math.ceil(window.innerHeight);
    const scroll = Math.ceil(window.scrollY);
    setWindowHeigth(scroll);
    setScrollPosition(documentHeigth - windowHeight);
  }

  function searchPokemonByName() {
    if (filterPokemonData !== undefined) {
      const filtredPokemonList = filterPokemonData.filter((pokemon) => {
        if (inputValue.current) {
          return pokemon.name.toLowerCase().includes(inputValue.current.value);
        }
      });
      setPokemonData(filtredPokemonList);
    }
    if (inputValue.current && inputValue.current.value === "") {
      setPokemonData(filterPokemonData);
    }
  }

  useEffect(() => {
    if (pokeApi !== undefined && "results" in pokeApi) {
      setPokemonData(pokeApi?.results);
      setFilterPokemonData(pokeApi?.results);
      setNextResult(pokeApi?.next);
    }
  }, [pokeApi]);

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
          setNextResult(res.data.next);
          setPokemonData((prevState) => {
            if (prevState !== undefined) {
              return [...prevState, ...res.data.results];
            }
          });
          setFilterPokemonData((prevState) => {
            if (prevState !== undefined) {
              return [...prevState, ...res.data.results];
            }
          });
        })
        .catch((error) => {
          false;
          console.log(error);
        });
    }
    return () => {
      window.removeEventListener("scroll", getScrollPosition);
    };
  }, [windowHeigth]);

  return (
    <>
      <NavBar navRef={navRef} />
      <Modal navRef={navRef} htmlRef={pokemonList} />
      <main>
        {isLoading === true && <Loader />}
        {message === undefined ? (
          <>
            <div className="container__search">
              <label htmlFor="search">Rechercher un pokémon</label>
              <input
                name="search"
                placeholder="Pikachu, mew, lucario..."
                onChange={searchPokemonByName}
                ref={inputValue}
                type="text"
              />
            </div>
            <section ref={pokemonList} className="container__list">
              {pokemonData &&
                pokemonData.map((pokemon) => <PokemonCard key={pokemon.name} pokemon={pokemon} />)}
            </section>
            <GoPageTop />
          </>
        ) : (
          <section className="container__error">
            <p>{message}</p>
          </section>
        )}
      </main>
    </>
  );
};
