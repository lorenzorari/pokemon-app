import React, { useEffect, useState } from 'react';
import { NamedAPIResources } from '../../../models/named-api-resource';
import { Pokemons } from '../../../models/pokemon';
import { getAllPokemons, getPokemon } from '../../services/pokemon';
import PokemonCard from '../pokemon/card/card';
import TextField from '../text-field';
import './App.scss';

function App() {
  const INITIAL_URL = 'https://pokeapi.co/api/v2/pokemon';
  const [searchValue, setSearchValue] = useState('');
  const [pokemons, setPokemons] = useState<Pokemons>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      const { results } = await getAllPokemons(INITIAL_URL);
      loadPokemons(results);
      setLoading(false);
    };

    init();
  }, []);

  const loadPokemons = async (data: NamedAPIResources) => {
    const pokemonData = await Promise.all(
      data.map(async ({ url }) => await getPokemon(url))
    );

    setPokemons(pokemonData);
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

  const searchPokemon = (wantedPokemon: string) => {
    // fetch(`${INITIAL_URL}/${wantedPokemon}`)
    //   .then(res => res.json())
    //   .then(res => {
    //     const data = humps.camelizeKeys(res);
    //     // setPokemons(data as Record<string, any>);
    //   })
    //   .catch();
  };

  return (
    <section>
      <form className="search-bar">
        <TextField
          type="text"
          placeholder="Search pokemon"
          onChange={e => handlePokemonSearch(e)}
          onKeyPress={e => handleKeyPress(e)}
        />
      </form>

      {!loading ? (
        <div className="pokemons-container">
          {pokemons.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </section>
  );
}

export default App;
