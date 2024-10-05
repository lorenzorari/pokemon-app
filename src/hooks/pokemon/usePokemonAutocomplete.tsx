import { getPokemonAutocompleteItems } from "src/services/pokemon";
import useSWR from "swr";

export function usePokemonAutocomplete() {
  const {
    data: pokemonAutocompleteItems,
    isLoading: isPokemonAutocompleteLoading,
  } = useSWR(`pokemon-autocomplete`, () => getPokemonAutocompleteItems());

  return {
    pokemonAutocompleteItems,
    isPokemonAutocompleteLoading,
  };
}
