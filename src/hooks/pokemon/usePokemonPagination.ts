import { NamedAPIResource } from 'src/models/named-api-resource';
import { getAllPokemons, getPokemon } from 'src/services/pokemon';
import useSWRInfinite from 'swr/infinite';

export function usePokemonPagination() {
  // const {data, isLoading} = useSWR(`pokemon?offset=${offset}&limit=${limit}`, () =>
  //   getAllPokemons(offset, limit),
  // );
  const { data, setSize, size, isValidating } = useSWRInfinite(
    getKey,
    fetchPagination,
  );

  function getKey(pageIndex: number, previousPageData: any) {
    // reached the end
    if (previousPageData && !previousPageData.next) return null;

    // first page, we don't have `previousPageData`
    if (pageIndex === 0) return `/pokemon?limit=20`;

    // add the cursor to the API endpoint
    return previousPageData.next.split('v2')[1];
  }

  async function fetchPagination(key: string) {
    const [, query] = key.split('?');

    const searchParams = new URLSearchParams(query);
    const offset = Number(searchParams.get('offset'));
    const limit = Number(searchParams.get('limit'));

    const { results, previous, next } = await getAllPokemons(offset, limit);
    const pokemons = await loadPokemons(results);

    return { pokemons, next, previous };
  }

  async function loadPokemons(data: NamedAPIResource[] | undefined) {
    if (!data) return [];

    const pokemons = await Promise.all(
      data.map(async ({ name }) => await getPokemon(name!)),
    );

    return pokemons;
  }

  return { pagination: data, setSize, size, isValidating };
}
