import React, { Dispatch, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import InfiniteScroll from 'src/components/infinite-scroll';
import Loading from 'src/components/loading';
import PokemonCard from 'src/components/pokemon/card';
import { Pokemons } from 'src/models/pokemon';
import styles from './pokemon-list.module.scss';

interface Props {
  isLoadingMorePokemon: boolean;
  setIsLoadingMorePokemon: Dispatch<React.SetStateAction<boolean>>;
  loadMore: () => Promise<void>;
  pokemons: Pokemons;
}

const PokemonList = (props: Props) => {
  const history = useHistory();
  const [page, setPage] = useState<number>(1);
  const loaderRef = useRef(null);

  const handleClickCard = (id: number) => {
    history.push(`/pokemon/${id}`);
  };

  const handleObserver: IntersectionObserverCallback = (entries, observer) => {
    if (entries[0].isIntersecting && !props.isLoadingMorePokemon) {
      observer.unobserve(entries[0].target);

      props.setIsLoadingMorePokemon(true);
      setPage(page => page + 1);
    }
  };

  return (
    <InfiniteScroll
      observerCallback={handleObserver}
      loadMore={props.loadMore}
      page={page}
      ref={loaderRef}
      loaderElement={
        <div ref={loaderRef}>
          <Loading
            className={styles['more-pokemons-loader']}
            src="/assets/svg/logo.svg"
          />
        </div>
      }
    >
      <div className={styles['pokemons-container']}>
        {props.pokemons.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            className={styles.card}
            onClick={() => handleClickCard(pokemon.id)}
            pokemon={pokemon}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default PokemonList;
