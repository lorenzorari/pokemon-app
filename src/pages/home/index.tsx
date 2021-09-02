import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { NamedAPIResources } from '../../../models/named-api-resource';
import { Pokemons } from '../../../models/pokemon';
import PokemonCard from '../../components/pokemon/card';
import SearchBar from '../../components/search-bar';
import { getAllPokemons, getPokemon } from '../../services/pokemon';
import styles from './home.module.scss';

const Home = () => {
  const INITIAL_URL = 'https://pokeapi.co/api/v2/pokemon';
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const [pokemons, setPokemons] = useState<Pokemons>([]);
  const [previousPageUrl, setPreviousPageUrl] = useState<string>(null);
  const [nextPageUrl, setNextPageUrl] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [page, setPage] = useState(1);
  const loader = useRef(null);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (loader.current) observer.observe(loader.current);
  });

  useEffect(() => {
    const init = async () => {
      await handleMorePokemon();
    };

    init();
  }, [page]);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) setPage(page => page + 1);
  };

  useEffect(() => {
    const init = async () => {
      const { results, next, previous } = await getAllPokemons(INITIAL_URL);
      setPreviousPageUrl(previous);
      setNextPageUrl(next);
      loadPokemons(results);
      setLoading(false);
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
    const { results, next, previous } = await getAllPokemons(nextPageUrl);
    setPreviousPageUrl(previous);
    setNextPageUrl(next);
    loadPokemons(results);
  };

  const handlePokemonSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchPokemon(searchValue);
    }
  };

  const searchPokemon = async (value: string) => {
    if (value === '') {
      const { results } = await getAllPokemons(INITIAL_URL);
      setLoading(true);
      await loadPokemons(results);
      setLoading(false);
      return;
    }

    const pokemon = await getPokemon(value);
    setPokemons([pokemon]);
  };

  const handleClickCard = (id: number) => {
    history.push(`/pokedex/${id}`);
  };

  return (
    <section>
      <form className={styles['search-bar']}>
        <SearchBar
          type="text"
          placeholder="Search a pokemon by name or id..."
          onChange={e => handlePokemonSearch(e)}
          onKeyPress={e => handleKeyPress(e)}
        />
      </form>

      {!loading && pokemons.length ? (
        <>
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

          {/* <button onClick={handleMorePokemon}>More Pokemon</button> */}
          <div ref={loader}>More Pokemons</div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </section>
  );
};

export default Home;
