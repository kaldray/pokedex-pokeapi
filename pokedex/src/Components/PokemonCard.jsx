import React from "react";
import { useEffect, useState } from "react";

export const PokemonCard = ({ pokemon }) => {
  const [id, setID] = useState();
  const [imageUrl, setimageURL] = useState("");
  const { name, url } = pokemon;

  useEffect(() => {
    switch (url.length) {
      case 36:
        setID(url?.slice(-2, -1));
        break;
      case 37:
        setID(url?.slice(-3, -1));
        break;
      case 38:
        setID(url?.slice(-4, -1));
        break;
      case 39:
        setID(url?.slice(-5, -1));
        break;
      case 40:
        setID(url?.slice(-6, -1));
        break;
      default:
        setID(url?.slice(-2, -1));
    }
    if (id !== undefined) {
      setimageURL(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      );
    }
  }, [id]);

  return (
    <>
      {imageUrl && (
        <div className="card">
          <img width="100px" height="100px" src={imageUrl}></img>
          <p>{name}</p>
        </div>
      )}
    </>
  );
};
