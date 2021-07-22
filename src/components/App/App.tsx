import humps from 'humps';
import React, { useEffect, useState } from 'react';
import { NamedAPIResources } from '../../../models/named-api-resource';
import { Pokemons } from '../../../models/pokemon';
import { getAllPokemons, getPokemon } from '../../services/pokemon';
import PokemonCard from '../pokemon/card/card';
import TextField from '../text-field';
import styles from './App.module.scss';

function App() {
  const INITIAL_URL = 'https://pokeapi.co/api/v2/pokemon';
  const [searchValue, setSearchValue] = useState('');
  const [pokemons, setPokemons] = useState<Pokemons>([]);
  const [previousPageUrl, setPreviousPageUrl] = useState<string>(null);
  const [nextPageUrl, setNextPageUrl] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  const searchPokemon = async (wantedPokemon: string) => {
    if (wantedPokemon === '') {
      const { results } = await getAllPokemons(INITIAL_URL);
      setLoading(true);
      await loadPokemons(results);
      setLoading(false);
      return;
    }

    const pokemon = await getPokemon(wantedPokemon);
    setPokemons([pokemon]);
  };

  return (
    <section>
      <form className={styles['search-bar']}>
        <TextField
          type="text"
          placeholder="Search a pokemon by name or id..."
          onChange={e => handlePokemonSearch(e)}
          onKeyPress={e => handleKeyPress(e)}
        />
      </form>

      {!loading && pokemons.length > 0 ? (
        <>
          <div className={styles['pokemons-container']}>
            {pokemons.map(pokemon => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>

          <button onClick={handleMorePokemon}>More Pokemon</button>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </section>
  );
}

export default App;
