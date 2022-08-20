import { useState, useEffect } from "react";
import axios from "axios";

import { NamedAPIResourceList } from "types";

export const getPokeApi = () => {
  const [pokeApi, setPokeApi] = useState<NamedAPIResourceList>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        setIsLoading(true);
        const { data } = await axios.get<NamedAPIResourceList>(
          "https://pokeapi.co/api/v2/pokemon?&limit=50"
        );
        setPokeApi(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    fetchPokemon();
  }, []);

  return { pokeApi, isLoading, setIsLoading };
};
