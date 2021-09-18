import axios from 'axios';
import { Pokemon } from '../models/pokemon';
import { PokemonPagination } from './../models/pokemon/pagination';
import { convertUnderscoreToCamelcase } from '../helpers/utils/convert-underscore-to-camelcase';

const INITIAL_URL = 'https://pokeapi.co/api/v2/pokemon';

const getPokemon = async (pokemon: string): Promise<Pokemon> => {
  return new Promise(resolve =>
    axios.get(`${INITIAL_URL}/${pokemon}`).then(res => {
      const data = convertUnderscoreToCamelcase(res.data);
      resolve(data as Pokemon);
    })
  );
};

const getAllPokemons = async (
  offset: number = null,
  limit: number = null,
  url: string = INITIAL_URL
): Promise<PokemonPagination> => {
  if (offset || limit) {
    url = INITIAL_URL + `?offset=${offset}&limit=${limit}`;
  }

  return new Promise(resolve =>
    axios.get(url).then(({ data }) => resolve(data as PokemonPagination))
  );
};

export { getPokemon, getAllPokemons };
