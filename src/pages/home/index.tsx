import React, { useEffect, useRef, useState } from 'react';
import { Main } from 'react-tsparticles';
import Loading from 'src/components/loading';
import HomepageHeadingContainer from 'src/containers/homepage-heading';
import PokemonList from 'src/containers/pokemon/list';
import tsparticlesOptions from 'src/data/tsparticlesOptions';
import { NamedAPIResources } from 'src/models/named-api-resource';
import { Pokemons } from 'src/models/pokemon';
import { getAllPokemons, getPokemon } from 'src/services/pokemon';
import styles from './home.module.scss';

const HomePage = () => {
  const POKEMON_QUANTITY = 898;
  const POKEMON_FETCH_LIMIT = 20;

  const [pokemons, setPokemons] = useState<Pokemons>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string>(null);
  const [allPokemonResources, setAllPokemonResources] =
    useState<NamedAPIResources>([]);

  const [isLoadingMorePokemon, setIsLoadingMorePokemon] = useState(false);
  const [areParticlesLoading, setAreParticlesLoading] = useState(true);
  const [isLoadingPokemon, setIsLoadingPokemon] = useState<boolean>(true);
  const isPageLoading: boolean = isLoadingPokemon || areParticlesLoading;

  const cardsRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const { results } = await getAllPokemons(null, POKEMON_QUANTITY);
      await loadPokemons(results.slice(0, POKEMON_FETCH_LIMIT));
      setNextPageUrl('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
      setAllPokemonResources(results);
      setIsLoadingPokemon(false);
    };

    init();
  }, []);

  const loadPokemons = async (data: NamedAPIResources) => {
    const pokemonData = await Promise.all(
      data.map(async ({ name }) => await getPokemon(name))
    );

    setPokemons([...pokemons, ...pokemonData]);
  };

  const handleMorePokemon = async () => {
    if (nextPageUrl) {
      const { results, next } = await getAllPokemons(null, null, nextPageUrl);
      setNextPageUrl(next);
      await loadPokemons(results);
    }
  };

  const loadMore = async () => {
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

      {!isPageLoading && pokemons.length ? (
        <section ref={cardsRef}>
          <PokemonList
            pokemons={pokemons}
            loadMore={loadMore}
            isLoadingMorePokemon={isLoadingMorePokemon}
            setIsLoadingMorePokemon={setIsLoadingMorePokemon}
          />
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
