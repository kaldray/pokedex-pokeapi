import { useState, useEffect } from "react";
import axios from "axios";

import { getEvolutions } from "../functions";

export const getPokeApiDeepData = (id) => {
  const [pokemonAttributes, setPokemonAttributes] = useState();
  const [pokemonEvolution, setPokemonEvolution] = useState();
  const [pokemonSpecies, setPokemonSpecies] = useState();

  async function getPokemonData() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((response) => {
        return response;
      })
      .then((res) => {
        setPokemonAttributes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function getPokemonDataSpecies() {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
      .then((response) => {
        return response;
      })
      .then((res) => {
        setPokemonSpecies(res.data);
        return res.data.evolution_chain;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function getPokemonDataEvolution() {
    const { url } = await getPokemonDataSpecies();
    axios
      .get(url)
      .then((response) => {
        return response;
      })
      .then(({ data }) => {
        const evolution = getEvolutions(data);
        setPokemonEvolution(evolution);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if (id === undefined) return;
    getPokemonData();
    getPokemonDataEvolution();
  }, []);

  return { pokemonAttributes, pokemonEvolution, pokemonSpecies };
};
