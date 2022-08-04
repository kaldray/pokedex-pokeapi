import { useState, useEffect } from "react";
import axios from "axios";

export const getPokeApi = () => {
  const [pokeApi, setPokeApi] = useState();

  useEffect(() => {
    async function fetchPokemon() {
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?&limit=50"
      );

      setPokeApi(data);
    }

    fetchPokemon();
  }, []);

  return { pokeApi };
};
