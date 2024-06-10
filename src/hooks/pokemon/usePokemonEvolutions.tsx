import { getIdFromResourceUrl } from 'src/helpers/get-id-from-resource-url';
import { ChainLink } from 'src/models/evolution/chain';
import { getEvolutionChain } from 'src/services/evolution-chain';
import useSWR from 'swr';

export function usePokemonEvolutions(pokemonId: string) {
  const { data, isLoading } = useSWR(`pokemon/${pokemonId}/evolution-chain`, () =>
    getEvolutionChain(pokemonId)
  );

  const createEvolution = (url: string, name: string) => {
    return {
      id: getIdFromResourceUrl(url),
      name,
    };
  };

  const addSimpleEvolution = ({ species }: ChainLink, array: Array<any>) => {
    array.push(createEvolution(species.url!, species.name!));
  };

  const addAlternateEvolutions = (chainLinks: ChainLink[], array: Array<any>) => {
    const finalEvolutions: any = [];

    const alternateEvos = chainLinks.map(({ evolvesTo, species }) => {
      if (evolvesTo.length) addSimpleEvolution(evolvesTo[0], finalEvolutions);

      return createEvolution(species.url!, species.name!);
    });

    array.push(alternateEvos);
    finalEvolutions.length && array.push(finalEvolutions);
  };

  const getPokemonEvolutions = (chainLink?: ChainLink) => {
    if (chainLink) {
      const { url, name } = chainLink.species; // First species

      const evolutions: any = [createEvolution(url!, name!)];

      let currentEvo = chainLink.evolvesTo;

      while (currentEvo.length) {
        if (currentEvo.length === 1) {
          addSimpleEvolution(currentEvo[0], evolutions);
          currentEvo = currentEvo[0].evolvesTo;
        }

        if (currentEvo.length > 1) {
          addAlternateEvolutions(currentEvo, evolutions);
          break;
        }
      }

      return evolutions;
    }

    return null;
  };

  return {
    pokemonEvolutions: getPokemonEvolutions(data?.chain),
    arePokemonEvolutionsLoading: isLoading,
  };
}
