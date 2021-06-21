import React, { useEffect, useState } from 'react';
import './App.scss';
import { Pokemon } from '../../../models/pokemon';
import humps from 'humps';
import PokemonCard from '../pokemon/card/card';

function App() {
  const [pokemon, setPokemon] = useState<Pokemon>(null);

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

  // const getArtworkUrl = (pokemon: Pokemon) => {
  //   return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  // };

  // const zeroPad = (id: number, places: number) => {
  //   return String(id).padStart(places, '0');
  // };

  return (
    <section>
      <PokemonCard pokemon={pokemon} />
    </section>
  );
}

export default App;
