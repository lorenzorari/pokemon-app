import React, {
  Dispatch,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  limit: number;
  isFiltering: boolean;
}

const PokemonList = (props: Props) => {
  const history = useHistory();
  const [page, setPage] = useState<number>(1);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (props.isFiltering) {
      setPage(1);
    }
  }, [props.isFiltering]);

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const { isIntersecting } = entries[0];

      if (isIntersecting && !props.isLoadingMorePokemon) {
        setPage((page) => page + 1);
      }
    },
    [props.isLoadingMorePokemon],
  );

  const handleClickCard = (id: number) => {
    history.push(`/pokemon/${id}`);
  };

  return (
    <>
      {props.isFiltering === false ? (
        <InfiniteScroll
          observerCallback={handleObserver}
          loadMore={props.loadMore}
          page={page}
          ref={loaderRef}
          loaderElement={
            <>
              {props.pokemons.length < props.limit && (
                <div ref={loaderRef}>
                  <Loading
                    className={styles['more-pokemons-loader']}
                    src="/assets/svg/logo.svg"
                  />
                </div>
              )}
            </>
          }
        >
          <div className={styles['pokemons-container']}>
            {props.pokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                className={styles.card}
                onClick={() => handleClickCard(pokemon.id!)}
                pokemon={pokemon}
              />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className={styles['filter-loader']}>
          <Loading src="/assets/svg/logo.svg" />
        </div>
      )}
    </>
  );
};

export default PokemonList;
