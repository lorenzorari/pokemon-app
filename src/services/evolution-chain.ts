import { pokeapi } from 'src/helpers/http';
import { EvolutionChain } from 'src/models/evolution/chain';

const getEvolutionChain = async (pokemonId: string): Promise<EvolutionChain> => {
  return await pokeapi.get(`evolution-chain/${pokemonId}`).json<EvolutionChain>();
};

export { getEvolutionChain };
