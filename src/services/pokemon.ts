import { Pokemon } from 'src/models/pokemon';
import { PokemonPagination } from 'src/models/pokemon/pagination';
import { pokeapi } from 'src/helpers/http';
import { getAnthropometry } from 'src/helpers/getAnthropometry';
import { POKEMON_QUANTITY } from 'src/constants';
import { getIdFromResourceUrl } from 'src/helpers/get-id-from-resource-url';
import { PokemonAutocompleteItem } from 'src/components/autocomplete/types';
import { getArtworkUrl } from 'src/helpers/get-artwork-url';

const getPokemon = async (id: string): Promise<Pokemon> => {
  const pokemonData = await pokeapi.get(`pokemon/${id}`).json<Pokemon>();

  pokemonData.height = getAnthropometry(pokemonData.height ?? -1);
  pokemonData.weight = getAnthropometry(pokemonData.weight ?? -1);

  return pokemonData;
};

const getAllPokemons = async (
  offset?: number,
  limit?: number,
): Promise<PokemonPagination> => {
  const params = offset || limit ? `?offset=${offset}&limit=${limit}` : '';
  const url = `pokemon${params}`;

  return await pokeapi.get(url).json<PokemonPagination>();
};

const getPokemonAutocompleteItems = async () => {
  const { results } = await getAllPokemons(undefined, POKEMON_QUANTITY);

  if (!results) return [];

  return results.map(({ name, url }) => {
    const id = getIdFromResourceUrl(url);

    return {
      id,
      name,
      imageUrl: getArtworkUrl(id),
    } as PokemonAutocompleteItem;
  });
};

export { getPokemon, getAllPokemons, getPokemonAutocompleteItems };
