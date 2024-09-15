import { useEffect, useRef, useState } from "react";
import { POKEMON_QUANTITY } from "src/constants";
import PokemonList from "src/containers/pokemon/list";
import { getGenerationSlices } from "src/helpers/get-generation-slices";
import { NamedAPIResources } from "src/models/named-api-resource";
import { Pokemons } from "src/models/pokemon";
import { getGeneration } from "src/services/generation";
import { getAllPokemons, getPokemon } from "src/services/pokemon";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "src/components/select";
import { MainLayout } from "src/layouts/MainLayout";

const POKEMON_FETCH_LIMIT = 20;

const ExplorePage = () => {
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemons>([]);
  const [generationNames, setGenerationNames] = useState<string[]>([]);
  const [pokemonListLimit, setPokemonListLimit] =
    useState<number>(POKEMON_QUANTITY);
  const [allPokemonResources, setAllPokemonResources] =
    useState<NamedAPIResources>([]);
  const [filteredPokemonResources, setFilteredPokemonResources] =
    useState<NamedAPIResources>([]);

  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isFilteringPokemon, setIsFilteringPokemon] = useState<boolean>(false);

  const cardsRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const { results: pokeRes } = await getAllPokemons(
        undefined,
        POKEMON_QUANTITY,
      );
      const { results: generationRes } = await getGeneration();

      if (!pokeRes || !generationRes) return;

      const slicedPokemonResources = pokeRes.slice(0, POKEMON_FETCH_LIMIT);
      const pokemonData = await loadPokemons(slicedPokemonResources);

      setDisplayedPokemons([...displayedPokemons, ...pokemonData]);
      setGenerationNames(generationRes.map((gen) => gen.name!));
      setAllPokemonResources(pokeRes);
      setFilteredPokemonResources(pokeRes);
    };

    init();
  }, []);

  useEffect(() => {
    const updateDisplayedPokemons = async () => {
      setIsFilteringPokemon(true);
      const slicedFilteredPokemonResources = filteredPokemonResources.slice(
        0,
        POKEMON_FETCH_LIMIT,
      );
      const pokemonData = await loadPokemons(slicedFilteredPokemonResources);

      setDisplayedPokemons(pokemonData);
      setPokemonListLimit(filteredPokemonResources.length);
      setIsFilteringPokemon(false);
    };

    updateDisplayedPokemons();
  }, [filteredPokemonResources]);

  const loadPokemons = async (data: NamedAPIResources) => {
    const pokemonData = await Promise.all(
      data.map(async ({ name }) => await getPokemon(name!)),
    );

    return pokemonData;
  };

  const handleMorePokemon = async () => {
    const { length } = displayedPokemons;
    const endSlice = length + POKEMON_FETCH_LIMIT;
    const slicedResources = filteredPokemonResources.slice(length, endSlice);

    const pokemonData = await loadPokemons(slicedResources);

    setDisplayedPokemons([...displayedPokemons, ...pokemonData]);
  };

  const loadMore = async () => {
    setIsLoadingMore(true);
    await handleMorePokemon();
    setIsLoadingMore(false);
  };

  const handleClickGeneration = (value: string) => {
    if (value === "All") {
      setFilteredPokemonResources(allPokemonResources);
      return;
    }

    const { startSlice, endSlice } = getGenerationSlices(value);
    const slicedGeneration = allPokemonResources.slice(startSlice, endSlice);

    setFilteredPokemonResources(slicedGeneration);
  };

  return (
    <MainLayout>
      <section ref={cardsRef} className="px-32">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-4xl font-bold">Pokémon</h2>
          <span className="rounded-full bg-gray-200/70 px-2 text-sm text-gray-500">
            {pokemonListLimit}
          </span>
        </div>

        <div className="mb-10">
          <Select defaultValue="All" onValueChange={handleClickGeneration}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="px-1">
              <SelectItem
                value={"All"}
                className="select-none hover:bg-black hover:text-white"
              >
                All generations
              </SelectItem>
              {generationNames.map((name) => (
                <SelectItem
                  className="select-none hover:bg-black hover:text-white"
                  key={name}
                  value={name}
                >
                  Generation {name.split("-")[1].toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <PokemonList
          pokemons={displayedPokemons}
          loadMore={loadMore}
          isLoadingMorePokemon={isLoadingMore}
          setIsLoadingMorePokemon={setIsLoadingMore}
          limit={pokemonListLimit}
          isFiltering={isFilteringPokemon}
        />
      </section>
    </MainLayout>
  );
};

export default ExplorePage;
