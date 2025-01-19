import { useEffect, useRef, useState } from 'react';
import { POKEMON_QUANTITY } from 'src/constants';
import PokemonList from 'src/components/pokemon/list';
import { getGenerationSlices } from 'src/helpers/get-generation-slices';
import { NamedAPIResources } from 'src/models/named-api-resource';
import { getGeneration } from 'src/services/generation';
import { getAllPokemons } from 'src/services/pokemon';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from 'src/components/select';
import { MainLayout } from 'src/layouts/MainLayout';
import { cn } from 'src/utils/classnames';

const ExplorePage = () => {
  const [generationNames, setGenerationNames] = useState<string[]>([]);
  const [pokemonListLimit, setPokemonListLimit] =
    useState<number>(POKEMON_QUANTITY);
  const [allPokemonResources, setAllPokemonResources] =
    useState<NamedAPIResources>([]);
  const [filteredPokemonResources, setFilteredPokemonResources] =
    useState<NamedAPIResources>([]);

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

      setGenerationNames(generationRes.map((gen) => gen.name!));
      setAllPokemonResources(pokeRes);
      setFilteredPokemonResources(pokeRes);
    };

    init();
  }, []);

  useEffect(() => {
    const updateDisplayedPokemons = async () => {
      setIsFilteringPokemon(true);

      setPokemonListLimit(filteredPokemonResources.length);
      setIsFilteringPokemon(false);
    };

    updateDisplayedPokemons();
  }, [filteredPokemonResources]);

  const handleClickGeneration = (value: string) => {
    if (value === 'All') {
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
          <span
            className={cn(
              'rounded-full bg-gray-200/70 px-2 text-sm text-gray-500 opacity-0',
              { 'opacity-100 transition-opacity': pokemonListLimit > 0 },
            )}
          >
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
                value={'All'}
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
                  Generation {name.split('-')[1].toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <PokemonList isFiltering={isFilteringPokemon} />
      </section>
    </MainLayout>
  );
};

export default ExplorePage;
