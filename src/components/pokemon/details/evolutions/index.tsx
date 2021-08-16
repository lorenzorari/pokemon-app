import React from 'react';
import PokemonEvolution from '../../evolution';
import styles from './evolutions.module.scss';

const PokemonDetailsEvolutions = ({ pokemonEvolutions }) => {
  return (
    <ul className={styles['evolutions-container']}>
      {pokemonEvolutions.map(evo => {
        return (
          <li key={evo.id}>
            <div className={styles['line-container']}>
              <hr />
            </div>

            {Array.isArray(evo) ? (
              evo.map(alternateEvo => (
                <PokemonEvolution
                  key={alternateEvo.id}
                  evolution={alternateEvo}
                />
              ))
            ) : (
              <PokemonEvolution evolution={evo} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default PokemonDetailsEvolutions;
