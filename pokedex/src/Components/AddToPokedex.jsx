import React from "react";
import { useSelector } from "react-redux";
import { ReactComponent as PokeballFull } from "../assets/pokeballFull.svg";
import { ReactComponent as PokeballEmpty } from "../assets/pokeballEmpty.svg";

export const AddToPokedex = ({ addOrRemoveFromPokedex, data, isOnPokedex }) => {
  const style = {
    height: "20px",
    width: "20px",
    cursor: "pointer",
  };

  return (
    <>
      {isOnPokedex === false && (
        <PokeballEmpty
          onClick={() => addOrRemoveFromPokedex(data)}
          style={style}
        />
      )}
      {isOnPokedex === true && (
        <PokeballFull
          onClick={() => addOrRemoveFromPokedex(data)}
          style={style}
        />
      )}
    </>
  );
};
