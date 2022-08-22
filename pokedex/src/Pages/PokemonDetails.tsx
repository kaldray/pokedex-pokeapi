import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { NavBar, AddToPokedex, Modal } from "../Components";
import { getPokeApiDeepData } from "../services";
import { checkIndex } from "../functions";
import { useAppSelector } from "../store/hooks";
import { CustomPokemonAttributes, Evolution, NamedAPIResource } from "types";

export const PokemonDetails = () => {
  const { id } = useParams();
  const { pokemonAttributes, pokemonEvolution, pokemonSpecies } = getPokeApiDeepData(id);
  const [attributes, setAttributes] = useState<CustomPokemonAttributes>();
  const [species, setPokemonSpecies] = useState<NamedAPIResource>();
  const [isOnPokedex, setIsOnPokedex] = useState(false);
  const [imageUrl, setimageURL] = useState<Array<Evolution>>();
  const { pokemons } = useAppSelector((state) => state.pokemon);
  const pokemonCard = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (pokemonAttributes !== undefined && pokemonSpecies !== undefined) {
      const {
        types,
        stats,
        sprites: { front_default },
        name,
        height,
        weight,
        species,
      } = pokemonAttributes;
      const { flavor_text_entries, base_happiness, capture_rate } = pokemonSpecies;
      setAttributes({
        types,
        stats,
        front_default,
        name,
        height,
        weight,
        flavor_text_entries,
        base_happiness,
        capture_rate,
      });
      setPokemonSpecies(species);
    }
  }, [pokemons, pokemonEvolution, pokemonAttributes]);

  useEffect(() => {
    if (species !== undefined) {
      if (checkIndex(pokemons, species) !== undefined) {
        setIsOnPokedex(true);
      }
      if (checkIndex(pokemons, species) === undefined) {
        setIsOnPokedex(false);
      }
    }
  }, [attributes]);

  useEffect(() => {
    if (pokemonEvolution !== undefined) {
      let evolution = pokemonEvolution.filter((val) => {
        return val.id !== id;
      });
      evolution = evolution.map((val, i) => {
        return {
          ...val,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${val.id}.png`,
        };
      });
      setimageURL(evolution);
    }
  }, [pokemonEvolution]);

  return (
    <>
      <NavBar navRef={navRef} />
      <Modal navRef={navRef} htmlRef={pokemonCard} />
      <section ref={pokemonCard} className="container__unique top">
        <figure>
          <img src={attributes?.front_default} alt={attributes?.name} />
          <figcaption>{attributes?.name}</figcaption>
          <p>{attributes?.flavor_text_entries.at(0)?.flavor_text}</p>
          {species !== undefined && <AddToPokedex isOnPokedex={isOnPokedex} pokemon={species} />}
        </figure>
        <ul className="container__types">
          <p>Type :</p>
          {attributes?.types?.map((val) => (
            <li key={val.slot}>{val.type.name}</li>
          ))}
        </ul>
        <span>Statistiques</span>
        <ul className="container__stats">
          {attributes?.stats?.map((val) => (
            <li key={val.stat?.name}>
              {val.stat?.name} : {val.base_stat}{" "}
            </li>
          ))}
        </ul>
        <span>Profil</span>
        <div className="container__profil">
          <p>Height : {attributes?.height}</p>
          <p>Weight : {attributes?.weight}</p>
          <p>Base hapineess : {attributes?.base_happiness}</p>
          <p>Capture rate : {attributes?.capture_rate}</p>
        </div>
        {imageUrl && imageUrl.length >= 1 && (
          <>
            <span>Evolutions</span>
            <div className="container__evolution">
              {imageUrl &&
                imageUrl.map((val) => {
                  return (
                    <div key={val.name}>
                      <figure>
                        <img src={val?.img} alt={val?.img} />
                        <figcaption>{val?.name}</figcaption>
                      </figure>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </section>
    </>
  );
};
