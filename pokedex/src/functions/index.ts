import { ChainLink, EvolutionChain, Evolution, NamedAPIResource, Url } from "types";

export function extractId(url: Url) {
  const id = url.split("/").reverse().at(1);
  return id;
}

export function checkIndex(reduxState: NamedAPIResource[], pokemonCard: NamedAPIResource) {
  if (reduxState !== undefined) {
    const findPokemon = reduxState.find((val) => {
      return val.name === pokemonCard.name;
    });
    return findPokemon?.name;
  }
}

export function getEvolutions(
  chain: EvolutionChain | ChainLink,
  evolutions: Evolution[] = []
): Array<Evolution> {
  if ("chain" in chain) {
    const name = chain.chain.species?.name;
    const id = chain.chain.species?.url.split("/").reverse()[1];
    evolutions.push({ name, id });
  } else if ("species" in chain) {
    const name = chain.species?.name;
    const id = chain.species?.url.split("/").reverse()[1];
    evolutions.push({ name, id });
  }

  if ("chain" in chain) {
    if (chain?.chain.evolves_to.length === 0) return evolutions;
    else return getEvolutions(chain?.chain.evolves_to[0], evolutions);
  } else {
    if (chain.evolves_to.length === 0) return evolutions;
    return getEvolutions(chain?.evolves_to[0], evolutions);
  }
}

export const addToLocalStorage = (item: NamedAPIResource) => {
  const dataFromLocalStorage = localStorage.getItem("pokedex");
  if (dataFromLocalStorage === null) {
    let arr = [];
    arr.push(item);
    localStorage.setItem("pokedex", JSON.stringify(arr));
  } else {
    let parsedLocalStorage = JSON.parse(dataFromLocalStorage);
    parsedLocalStorage.push(item);
    localStorage.setItem("pokedex", JSON.stringify(parsedLocalStorage));
  }
};

export function removeFromLocalStorage(item: NamedAPIResource) {
  const dataFromLocalStorage = localStorage.getItem("pokedex");
  if (dataFromLocalStorage !== undefined || dataFromLocalStorage !== null) {
    let parsedLocalStorage: NamedAPIResource[] = JSON.parse(dataFromLocalStorage || "");
    const filteredArr = parsedLocalStorage.filter((val) => {
      return val.name !== item.name;
    });
    localStorage.setItem("pokedex", JSON.stringify(filteredArr));
  }
}
