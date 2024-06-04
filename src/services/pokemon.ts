import axios from 'axios';
import { convertUnderscoreToCamelcase } from 'src/helpers/utils/convert-underscore-to-camelcase';
import { Pokemon } from 'src/models/pokemon';
import { PokemonPagination } from 'src/models/pokemon/pagination';

const INITIAL_URL = 'https://pokeapi.co/api/v2/pokemon';

const getPokemon = async (pokemon: string): Promise<Pokemon> => {
  return axios
    .get(`${INITIAL_URL}/${pokemon}`)
    .then((res) => {
      const data = convertUnderscoreToCamelcase(res.data);
      return data as Pokemon;
    })
    .catch(({ response }) => response);
};

const getAllPokemons = async (
  offset?: number,
  limit?: number,
  url: string = INITIAL_URL
): Promise<PokemonPagination> => {
  if (offset || limit) {
    url = INITIAL_URL + `?offset=${offset}&limit=${limit}`;
  }

  return axios.get(url).then(({ data }) => data as PokemonPagination);
};

export { getPokemon, getAllPokemons };
