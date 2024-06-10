import { getPokemon } from 'src/services/pokemon';
import useSWR from 'swr';

export default function usePokemon(id: string) {
  const { data } = useSWR(`pokemon/${id}`, () => getPokemon(id));

  return { pokemon: data };
}
