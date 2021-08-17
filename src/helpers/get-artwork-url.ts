import { Pokemon } from '../../models/pokemon';

const getArtworkUrl = (id: number) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export { getArtworkUrl };
