import { Pokemon } from '../../models/pokemon';

const getArtworkUrl = (pokemon: Pokemon) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
};

export { getArtworkUrl };
