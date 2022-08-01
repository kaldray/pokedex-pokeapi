import React from "react";
import { usePokeApi } from "../services";

export const Home = () => {
  const pokemons = usePokeApi();
  console.log(pokemons);
  return (
    <>
      <div>Home</div>
    </>
  );
};
