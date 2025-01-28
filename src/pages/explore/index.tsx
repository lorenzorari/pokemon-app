import { useState } from 'react';
import PokemonList from 'src/components/pokemon/list';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from 'src/components/select';
import { MainLayout } from 'src/layouts/MainLayout';
import { cn } from 'src/utils/classnames';
import {
  PokemonCounter,
  PokemonCounterContext,
} from './contexts/usePokemonCounter';
import { useGenerations } from 'src/hooks/pokemon/useGenerations';

const ExplorePage = () => {
  const { generations, formatGenerationName } = useGenerations();
  const [pokemonCount, setPokemonCount] = useState<PokemonCounter>(undefined);

  const [isFilteringPokemon, setIsFilteringPokemon] = useState<boolean>(false);

  const handleClickGeneration = (value: string) => {
    // if (value === 'All') {
    //   setFilteredPokemonResources(allPokemonResources);
    //   return;
    // }
    // const { startSlice, endSlice } = getGenerationSlices(value);
    // const slicedGeneration = allPokemonResources.slice(startSlice, endSlice);
    // setFilteredPokemonResources(slicedGeneration);
  };

  return (
    <MainLayout>
      <PokemonCounterContext.Provider value={{ setPokemonCount }}>
        <section className="px-5 lg:px-10 xl:px-32">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-4xl font-bold">Pokémon</h2>
            <span
              className={cn(
                'rounded-full bg-gray-200/70 px-2 text-sm text-gray-500 opacity-0',
                {
                  'opacity-100 transition-opacity': (pokemonCount || 0) > 0,
                },
              )}
            >
              {pokemonCount}
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
                  className="select-none bg-black text-white"
                >
                  All generations
                </SelectItem>
                {generations?.map(({ name }) => (
                  <SelectItem
                    className="select-none hover:bg-black hover:text-white"
                    key={name}
                    value={name}
                  >
                    {formatGenerationName(name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <PokemonList isFiltering={isFilteringPokemon} />
        </section>
      </PokemonCounterContext.Provider>
    </MainLayout>
  );
};

export default ExplorePage;
