import React, { useEffect, useState } from 'react';
import './App.scss';
import { Pokemon } from '../../../models/pokemon';
import humps from 'humps';
import PokemonCard from '../pokemon/card/card';
import TextField from '../text-field';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon>(null);

  console.log({ searchValue });

  useEffect(() => {
    const init = async () => {
      fetch('https://pokeapi.co/api/v2/pokemon/charizard')
        .then(res => res.json())
        .then(res => {
          const data = humps.camelizeKeys(res);
          setPokemon(data as Record<string, any>);
        });
    };

    init();
  }, []);

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
    fetch(`https://pokeapi.co/api/v2/pokemon/${wantedPokemon}`)
      .then(res => res.json())
      .then(res => {
        const data = humps.camelizeKeys(res);
        setPokemon(data as Record<string, any>);
      })
      .catch();
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

      <PokemonCard pokemon={pokemon} />
    </section>
  );
}

export default App;
