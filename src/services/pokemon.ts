import axios from 'axios';
import humps from 'humps';
import { Pokemon } from '../../models/pokemon';
import { PokemonPagination } from './../../models/pokemon/pagination';

const INITIAL_URL = 'https://pokeapi.co/api/v2/pokemon';

const getPokemon = async (pokemon: string): Promise<Pokemon> => {
  return new Promise(resolve =>
    axios.get(`${INITIAL_URL}/${pokemon}`).then(res => {
      const data = humps.camelizeKeys(res.data); // Convert underscore to camelCase
      resolve(data as Pokemon);
    })
  );
};

const getAllPokemons = async (url: string): Promise<PokemonPagination> => {
  return new Promise(resolve =>
    axios.get(url).then(({ data }) => resolve(data as PokemonPagination))
  );
};

export { getPokemon, getAllPokemons };
