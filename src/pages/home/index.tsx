import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import HomepageHeadingContainer from '../../components/homepage-heading-container';
import InfiniteScroll from '../../components/infinite-scroll';
import Loading from '../../components/loading';
import PokemonCard from '../../components/pokemon/card';
import { NamedAPIResources } from '../../models/named-api-resource';
import { Pokemons } from '../../models/pokemon';
import { getAllPokemons, getPokemon } from '../../services/pokemon';
import styles from './home.module.scss';

const Home = () => {
  const INITIAL_URL = 'https://pokeapi.co/api/v2/pokemon';
  const history = useHistory();
  const [pokemons, setPokemons] = useState<Pokemons>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string>(null);
  const [page, setPage] = useState<number>(1);

  const [isLoadingMorePokemon, setIsLoadingMorePokemon] = useState(false);
  const [areParticlesLoading, setAreParticlesLoading] = useState(true);
  const [isLoadingPokemon, setIsLoadingPokemon] = useState<boolean>(true);

  const loaderRef = useRef(null);
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

  const handleClickCard = (id: number) => {
    history.push(`/pokemon/${id}`);
  };

  const handleObserver: IntersectionObserverCallback = (entries, observer) => {
    if (entries[0].isIntersecting && !isLoadingMorePokemon) {
      observer.unobserve(entries[0].target);

      setIsLoadingMorePokemon(true);
      setPage(page => page + 1);
    }
  };

  const loadMore = async () => {
    await handleMorePokemon();
    setIsLoadingMorePokemon(false);
  };

  return (
    <main className={styles.main}>
      <HomepageHeadingContainer
        scrollToRef={cardsRef}
        setAreParticlesLoading={setAreParticlesLoading}
        particlesLoaded={!isLoadingPokemon && !areParticlesLoading}
      />

      {!isLoadingPokemon && !areParticlesLoading && pokemons.length ? (
        <>
          <section ref={cardsRef}>
            <InfiniteScroll
              observerCallback={handleObserver}
              loadMore={loadMore}
              page={page}
              ref={loaderRef}
              loaderElement={
                <div ref={loaderRef} className={styles['more-pokemons-loader']}>
                  <ReactSVG src="/assets/svg/pokeball.svg" />
                </div>
              }
            >
              <div className={styles['pokemons-container']}>
                {pokemons.map(pokemon => (
                  <PokemonCard
                    key={pokemon.id}
                    className={styles.card}
                    onClick={() => handleClickCard(pokemon.id)}
                    pokemon={pokemon}
                  />
                ))}
              </div>
            </InfiniteScroll>
          </section>
        </>
      ) : (
        <section className={styles['loading-container']}>
          <Loading src="/assets/svg/logo.svg" />
        </section>
      )}
    </main>
  );
};

export default Home;
