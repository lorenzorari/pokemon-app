import humps from 'humps';
import { Pokemon } from '../../models/pokemon';
import { PokemonPagination } from './../../models/pokemon/pagination';

const INITIAL_URL = 'https://pokeapi.co/api/v2/pokemon';

const getPokemon = async (pokemon: string): Promise<Pokemon> => {
  return new Promise(resolve => {
    fetch(`${INITIAL_URL}/${pokemon}`)
      .then(res => res.json())
      .then(res => {
        const data = humps.camelizeKeys(res); // Convert underscore to camelCase
        resolve(data as Pokemon);
      });
  });
};

const getAllPokemons = async (url: string): Promise<PokemonPagination> => {
  return new Promise(resolve => {
    fetch(url)
      .then(res => res.json())
      .then(res => resolve(res as PokemonPagination));
  });
};

export { getPokemon, getAllPokemons };
