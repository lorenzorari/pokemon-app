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
  const INITIAL_URL = 'https://pokeapi.co/api/v2/pokemon';

  const [pokemons, setPokemons] = useState<Pokemons>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string>(null);
  const [isLoadingMorePokemon, setIsLoadingMorePokemon] = useState(false);
  const [areParticlesLoading, setAreParticlesLoading] = useState(true);
  const [isLoadingPokemon, setIsLoadingPokemon] = useState<boolean>(true);

  const isPageLoading: boolean = isLoadingPokemon || areParticlesLoading;

  const cardsRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const { results, next } = await getAllPokemons(INITIAL_URL);
      setNextPageUrl(next);
      await loadPokemons(results);
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
      const { results, next } = await getAllPokemons(nextPageUrl);
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
