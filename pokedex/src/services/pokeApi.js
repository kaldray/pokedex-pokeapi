import React, { useState, useEffect } from "react";
import axios from "axios";

export const usePokeApi = () => {
  const [pokemons, setPokemon] = useState();

  useEffect(() => {
    async function fetchPokemon() {
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?&limit=50"
      );

      setPokemon(data);
    }

    fetchPokemon();
  }, []);

  return { pokemons, setPokemon };
};
