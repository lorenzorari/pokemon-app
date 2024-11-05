import { getPokemon } from 'src/services/pokemon';
import useSWR from 'swr';

export function usePokemon(id: string) {
  const { data, isLoading } = useSWR(`pokemon/${id}`, () => getPokemon(id));

  return {
    pokemon: data,
    isPokemonLoading: isLoading,
  };
}
