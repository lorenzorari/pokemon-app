import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import InfiniteScroll from 'src/components/infinite-scroll';
import Loading from 'src/components/loading';
import styles from './pokemon-list.module.scss';
import { usePokemonPagination } from 'src/hooks/pokemon/usePokemonPagination';
import PokemonCard from '../card';
import { Loader } from 'src/components/ui/Loader';

interface Props {
  isFiltering: boolean;
}

const PokemonList = (props: Props) => {
  const { pagination, size, setSize, isValidating } = usePokemonPagination();
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

      if (isIntersecting && !isValidating) {
        loadMore();
      }
    },
    [isValidating, loadMore],
  );

  const handleClickCard = (id: string) => {
    history.push(`/pokemon/${id}`);
  };

  function loadMore() {
    setSize(size + 1);
  }

  return (
    <>
      {props.isFiltering === false ? (
        <InfiniteScroll
          observerCallback={handleObserver}
          loadMore={loadMore}
          page={page}
          ref={loaderRef}
          loaderElement={
            <>
              {/* TODO Remove when end list */}
              {/* {props.pokemons.length < props.limit && ( */}
              <div ref={loaderRef} className="flex justify-center py-8">
                <Loader />
              </div>
              {/* )} */}
            </>
          }
        >
          <div className={styles['pokemons-container']}>
            {pagination?.map((page) =>
              page.pokemons?.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  className={styles.card}
                  onClick={() => handleClickCard(pokemon.name!)}
                  pokemon={pokemon}
                />
              )),
            )}
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
