import React, { useEffect, useState, useRef } from "react";
import { usePokeApi } from "../services";
import { PokemonCard, NavBar } from "../Components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export const Home = () => {
  const { pokeApi } = usePokeApi();
  const [pokemonData, setPokemonData] = useState([]);
  const [filterPokemonData, setFilterPokemonData] = useState([]);
  const [windowHeigth, setWindowHeigth] = useState();
  const [scrollPosition, setScrollPosition] = useState();
  const [nextResult, setNextResult] = useState([]);
  const inputValue = useRef(null);
  const { pokemons } = useSelector((state) => state.pokemon);


  function getScrollPosition(e) {
    e.preventDefault();
    const documentHeigth = Math.ceil(document.documentElement.scrollHeight);
    const windowHeight = Math.ceil(window.innerHeight);
    const scroll = Math.ceil(window.scrollY);
    setWindowHeigth(scroll);
    setScrollPosition(documentHeigth - windowHeight);
  }

  function searchPokemonByName() {
    if (inputValue.current !== null) {
      const filtredPokemonList = filterPokemonData.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(inputValue.current.value);
      });
      setPokemonData(filtredPokemonList);
    }
    if (inputValue.current.value === "") {
      setPokemonData(filterPokemonData);
    }
  }

  useEffect(() => {
    setPokemonData(pokeApi?.results);
    setFilterPokemonData(pokeApi?.results);
    setNextResult(pokeApi?.next);
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
          console.log(res.data.next);
          setNextResult(res.data.next);
          setPokemonData((prevState) => [...prevState, ...res.data.results]);
          setFilterPokemonData((prevState) => [
            ...prevState,
            ...res.data.results,
          ]);
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
      <NavBar />
      <div className="container__search">
        <input onChange={searchPokemonByName} ref={inputValue} type="text" />
      </div>
      <section className="container__list">
        {pokemonData &&
          pokemonData.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
      </section>
    </>
  );
};
