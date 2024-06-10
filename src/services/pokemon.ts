import axios from 'axios';
import { Pokemon } from 'src/models/pokemon';
import { PokemonPagination } from 'src/models/pokemon/pagination';
import { pokeapi } from 'src/helpers/http';

const INITIAL_URL = 'https://pokeapi.co/api/v2/pokemon';

const getPokemon = async (id: string): Promise<Pokemon> => {
  return await pokeapi.get(`pokemon/${id}`).json<Pokemon>();
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
