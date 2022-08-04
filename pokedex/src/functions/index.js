export function extractId(url) {
  const id = url.split("/").reverse().at(1);
  return id;
}

export function checkIndex(reduxState, pokemonCard) {
  if (reduxState !== undefined) {
    const findPokemon = reduxState.find((val) => {
      return val.name === pokemonCard.name;
    });
    return findPokemon?.name;
  }
}

export function getEvolutions(chain, evolutions = []) {
  if (chain.chain !== undefined) {
    const name = chain.chain.species?.name;
    const id = chain.chain.species?.url.split("/").reverse()[1];
    evolutions.push({ name, id });
  } else {
    const name = chain.species?.name;
    const id = chain.species?.url.split("/").reverse()[1];
    evolutions.push({ name, id });
  }

  if (chain?.chain !== undefined) {
    if (chain?.chain.evolves_to.length === 0) return evolutions;
    else return getEvolutions(chain?.chain.evolves_to[0], evolutions);
  } else {
    if (chain.evolves_to.length === 0) return evolutions;
    return getEvolutions(chain?.evolves_to[0], evolutions);
  }
}
