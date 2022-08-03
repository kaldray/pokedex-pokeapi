import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPokemonAttributes } from "../services/pokemon";
import { NavBar } from "../Components";

export const PokemonDetails = () => {
  const [attributes, setAttributes] = useState();
  const { id } = useParams();
  const { pokemonAttributes, pokemonEvolution, pokemonChracteritics } =
    getPokemonAttributes(id);

  useEffect(() => {
    if (pokemonAttributes !== undefined) {
      const {
        types,
        stats,
        sprites: { front_default },
        name,
        height,
        weight,
      } = pokemonAttributes;
      setAttributes({ types, stats, front_default, name, height, weight });
    }
  }, [pokemonAttributes]);

  return (
    <>
      <NavBar />
      <section className="container__unique top">
        <figure>
          <img src={attributes?.front_default} alt={attributes?.name} />
          <figcaption>{attributes?.name}</figcaption>
          <p>{pokemonChracteritics?.descriptions.at(7)?.description}</p>
        </figure>
        <ul className="container__types">
          {attributes?.types.map((val) => (
            <li key={val.slot}>{val.type.name}</li>
          ))}
        </ul>
        <span>Statistiques</span>
        <ul className="container__stats">
          {attributes?.stats.map((val) => (
            <li key={val.stat?.name}>
              {val.stat?.name} : {val.base_stat}{" "}
            </li>
          ))}
        </ul>
        <span>Caractéritiques</span>
        <div>
          <p>height : {attributes?.height}</p>
          <p>weight : {attributes?.weight}</p>
        </div>
      </section>
    </>
  );
};
