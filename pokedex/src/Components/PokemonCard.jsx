import React from "react";
import { useEffect, useState } from "react";

export const PokemonCard = ({ pokemon }) => {
  const [id, setID] = useState();
  const [imageUrl, setimageURL] = useState("");
  const { name, url } = pokemon;

  function extractId() {
    const id = url.split("/").reverse().at(1);
    setID(id);
  }

  useEffect(() => {
    extractId();
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
