import { useState, useEffect } from "react";
import axios from "axios";

export const getPokemonAttributes = (id) => {
  const [pokemonAttributes, setPokemonAttributes] = useState();
  const [pokemonEvolution, setPokemonEvolution] = useState();
  const [pokemonChracteritics, setPokemonChracteritics] = useState();
  useEffect(() => {
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
    async function getPokemonDataChracteritics() {
      axios
        .get(`https://pokeapi.co/api/v2/characteristic/${id}/`)
        .then((response) => {
          return response;
        })
        .then((res) => {
          setPokemonChracteritics(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    async function getPokemonDataEvolution() {
      axios
        .get(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
        .then((response) => {
          return response;
        })
        .then((res) => {
          setPokemonEvolution(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (id === undefined) return;
    getPokemonData();
    getPokemonDataEvolution();
    getPokemonDataChracteritics();
  }, []);

  return { pokemonAttributes, pokemonEvolution, pokemonChracteritics };
};
