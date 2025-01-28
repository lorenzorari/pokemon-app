import { pokeapi } from 'src/helpers/http';
import { PokemonPagination } from '../models/pokemon/pagination';
import axios from 'axios';

const URL_GENERATION = 'https://pokeapi.co/api/v2/generation';

const getGeneration = async (id?: number): Promise<PokemonPagination> => {
  const url = URL_GENERATION + (id ? `/${id}` : '');

  return axios.get(url).then((res) => res.data as PokemonPagination);
};

const getGenerations = async () => {
  const { results } = await pokeapi.get('generation').json<PokemonPagination>();

  return results;
};

export { getGeneration, getGenerations };
