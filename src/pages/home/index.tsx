import React, { useEffect, useRef, useState } from 'react';
import { Main } from 'react-tsparticles';
import Loading from 'src/components/loading';
import { POKEMON_QUANTITY } from 'src/constants';
import HomepageHeadingContainer from 'src/containers/homepage-heading';
import PokemonList from 'src/containers/pokemon/list';
import tsparticlesOptions from 'src/data/tsparticlesOptions';
import { NamedAPIResources } from 'src/models/named-api-resource';
import { Pokemons } from 'src/models/pokemon';
import { getGeneration } from 'src/services/generation';
import { getAllPokemons, getPokemon } from 'src/services/pokemon';
import styles from './home.module.scss';

const HomePage = () => {
  const POKEMON_FETCH_LIMIT = 20;

  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemons>([]);
  const [generationResources, setGenerationResources] =
    useState<NamedAPIResources>([]);
  const [allPokemonResources, setAllPokemonResources] =
    useState<NamedAPIResources>([]);
  const [filteredPokemonResources, setFilteredPokemonResources] =
    useState<NamedAPIResources>([]);

  const [isLoadingMorePokemon, setIsLoadingMorePokemon] = useState(false);
  const [areParticlesLoading, setAreParticlesLoading] = useState(true);
  const [isLoadingPokemon, setIsLoadingPokemon] = useState<boolean>(true);
  const isPageLoading: boolean = isLoadingPokemon || areParticlesLoading;

  const cardsRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const { results: pokeRes } = await getAllPokemons(null, POKEMON_QUANTITY);
      const { results: generationRes } = await getGeneration();

      const slicedPokemonResources = pokeRes.slice(0, POKEMON_FETCH_LIMIT);
      const pokemonData = await loadPokemons(slicedPokemonResources);

      setDisplayedPokemons([...displayedPokemons, ...pokemonData]);
      setAllPokemonResources(pokeRes);
      setFilteredPokemonResources(pokeRes);
      setGenerationResources(generationRes);
      setIsLoadingPokemon(false);
    };

    init();
  }, []);

  const loadPokemons = async (data: NamedAPIResources) => {
    const pokemonData = await Promise.all(
      data.map(async ({ name }) => await getPokemon(name))
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
    setIsLoadingMorePokemon(true);
    await handleMorePokemon();
    setIsLoadingMorePokemon(false);
  };

  const initParticles = (tsParticles: Main) => {
    tsParticles
      .load('tsparticles', tsparticlesOptions)
      .then(() => setAreParticlesLoading(false));
  };

  return (
    <main className={styles.main}>
      <HomepageHeadingContainer
        heading="Pocketex"
        githubHref="https://github.com/lorenzorari/pocketex"
        githubImageSrc="/assets/svg/github.svg"
        scrollToRef={cardsRef}
        initParticles={initParticles}
        areParticlesLoading={isPageLoading}
        dataToFilter={allPokemonResources}
      />

      {!isPageLoading && displayedPokemons.length ? (
        <section className={styles['cards-section']} ref={cardsRef}>
          <div className={styles['cards-container']}>
            <h2 className={styles['cards-section-heading']}>
              Pokémon{' '}
              <span>
                ({displayedPokemons.length} / {POKEMON_QUANTITY})
              </span>
            </h2>

            <select onChange={e => console.log(e.target.value)}>
              {generationResources.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>

            <PokemonList
              pokemons={displayedPokemons}
              loadMore={loadMore}
              isLoadingMorePokemon={isLoadingMorePokemon}
              setIsLoadingMorePokemon={setIsLoadingMorePokemon}
            />
          </div>
        </section>
      ) : (
        <section className={styles['loading-container']}>
          <Loading src="/assets/svg/logo.svg" />
        </section>
      )}
    </main>
  );
};

export default HomePage;
