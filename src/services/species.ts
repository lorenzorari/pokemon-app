import { Species } from 'src/models/species';
import { pokeapi } from 'src/helpers/http';

const getSpecies = async (pokemonId: string): Promise<Species> => {
  return pokeapi.get(`pokemon-species/${pokemonId}`).json<Species>();
};

export { getSpecies };
