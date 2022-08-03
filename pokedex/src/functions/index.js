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
