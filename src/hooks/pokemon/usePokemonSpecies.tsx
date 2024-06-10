import { getSpecies } from 'src/services/species';
import useSWR from 'swr';

export function usePokemonSpecies(pokemonId: string) {
  const { data } = useSWR('pokemon-species/', () => getSpecies(pokemonId));

  return { pokemonSpecies: data };
}
