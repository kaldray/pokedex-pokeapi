import { useEffect } from "react";
import axios, { AxiosError } from "axios";

import { NamedAPIResourceList } from "types";
import { useAppDispatch } from "../store/hooks";
import { getPokeApi } from "../store/reducers/responseReducer";

export const fetchPokeApi = () => {
  const dispatch = useAppDispatch();
  const message = "Une erreur est survenue";

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const { data, status } = await axios.get<NamedAPIResourceList>(
          "https://pokeapi.co/api/v2/pokemon?&limit=150"
        );
        dispatch(getPokeApi({ pokeApi: data, status, isLoading: false }));
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response !== undefined) {
            dispatch(
              getPokeApi({ status: error.response?.status, isLoading: false, message: message })
            );
          }
        }
      }
    }
    fetchPokemon();
  }, []);
};
