import { useState, useEffect } from "react";
import axios from "axios";

import { getEvolutions } from "../functions";
import { PokemonAttributes, PokemonSpecies, Evolution, Url } from "types";

export const getPokeApiDeepData = (id: string | undefined) => {
  const [pokemonAttributes, setPokemonAttributes] = useState<PokemonAttributes>();
  const [pokemonEvolution, setPokemonEvolution] = useState<Array<Evolution>>();
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies>();

  async function getPokemonData() {
    axios
      .get<PokemonAttributes>(`https://pokeapi.co/api/v2/pokemon/${id}/`)
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
      .get<PokemonSpecies>(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
      .then((response) => {
        return response;
      })
      .then((res) => {
        setPokemonSpecies(res.data);
        getPokemonDataEvolution(res.data.evolution_chain.url);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function getPokemonDataEvolution(url: Url) {
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
    getPokemonDataSpecies();
  }, []);

  return { pokemonAttributes, pokemonEvolution, pokemonSpecies };
};
