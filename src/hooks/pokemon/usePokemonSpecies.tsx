import { getSpecies } from "src/services/species";
import useSWR from "swr";

export function usePokemonSpecies(pokemonId: string) {
  const { data: pokemonSpecies } = useSWR("pokemon-species/", () =>
    getSpecies(pokemonId),
  );

  const getGenus = () => {
    const genus = pokemonSpecies?.genera?.find(
      ({ language }) => language?.name === "en",
    )!.genus;

    if (!genus) return "";

    return genus.replace("Pokémon", "").trim();
  };

  return { pokemonSpecies, getGenus };
}
