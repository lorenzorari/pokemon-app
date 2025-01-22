import { useMemo } from 'react';
import { useParams } from 'react-router';
import { Navbar } from 'src/layouts/Navbar';
import { Breeding } from 'src/components/pages/pokemon-details/Breeding';
import PokemonDetailHero from 'src/components/pages/pokemon-details/Hero';
import { Training } from 'src/components/pages/pokemon-details/Training';
import { TypeEffectiveness } from 'src/components/pages/pokemon-details/TypeEffectiveness';
import { usePokemon } from 'src/hooks/pokemon/usePokemon';
import { usePokemonSpecies } from 'src/hooks/pokemon/usePokemonSpecies';
import { PokemonType } from 'src/models/types';

interface Params {
  id: string;
}

const DetailsPage = () => {
  const { id } = useParams<Params>();
  const { pokemon } = usePokemon(id);
  const { pokemonSpecies: species, getGenus } = usePokemonSpecies(id);
  // const { pokemonEvolutions, arePokemonEvolutionsLoading } =
  //   usePokemonEvolutions(id);
  const pokemonTypes = useMemo<string[]>(
    () => pokemon?.types?.map(({ type }) => type.name) || [],
    [pokemon?.types],
  );

  const getDescription = () => {
    const text = species?.flavorTextEntries?.find(
      ({ language }) => language.name === 'en',
    )!.flavorText;

    if (!text) return '';

    return (
      text
        ?.replace(/u'\f'/, ' ')
        .replace(/\u00AD/g, '')
        // eslint-disable-next-line no-control-regex
        .replace(/\u000C/g, ' ')
        .replace(/u' -\n'/, ' - ')
        .replace(/u'-\n'/, '-')
        .replace(/(\r\n|\n|\r)/gm, ' ')
    );
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto 2xl:max-w-[1440px]">
        {pokemon && (
          <>
            <PokemonDetailHero
              genus={getGenus()}
              pokemon={pokemon}
              pokemonTypes={pokemonTypes as PokemonType[]}
              description={getDescription()}
            />
            {species && (
              <section className="relative z-10 rounded-t-[40px] bg-white px-5 py-10 shadow-[0px_100px_484px_0px_rgba(0,0,0,0.4)] lg:-mt-16 lg:px-10 lg:py-[60px] xl:px-32">
                <div className="grid gap-10 md:grid-cols-[repeat(auto-fit,minmax(340px,1fr))]">
                  <Breeding species={species} />
                  <Training pokemon={pokemon} species={species} />
                  <TypeEffectiveness types={pokemonTypes} />
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default DetailsPage;
