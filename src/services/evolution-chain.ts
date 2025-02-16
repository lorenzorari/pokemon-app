import { pokeapi } from 'src/helpers/http';
import { EvolutionChain } from 'src/models/evolution/chain';

const getEvolutionChain = async (url: string): Promise<EvolutionChain> => {
  return await pokeapi.get(url).json<EvolutionChain>();
};

export { getEvolutionChain };
