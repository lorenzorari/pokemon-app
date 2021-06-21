import React, { useEffect, useState } from 'react';
import './App.scss';
import { Pokemon } from '../../../models/pokemon';
import humps from 'humps';

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

  const getArtworkUrl = (pokemon: Pokemon) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  };

  const zeroPad = (id: number, places: number) => {
    return String(id).padStart(places, '0');
  };

  return (
    <section>
      <div className="card">
        <h2 className="card__title">{pokemon?.name}</h2>

        <div className="card__number">{`#${zeroPad(pokemon?.id, 3)}`}</div>

        <figure className="card__figure">
          <img
            className="card__figure__image"
            src={pokemon && getArtworkUrl(pokemon)}
            alt={pokemon?.name}
          />
        </figure>

        <div className="card__type-container">
          <div className="card__type">{pokemon?.types[0].type.name}</div>
        </div>
      </div>
    </section>
  );
}

export default App;
