import React from 'react';
import PokemonEvolution from '../../evolution';
import styles from './evolutions.module.scss';

const PokemonDetailsEvolutions = ({ pokemonEvolutions }) => {
  return (
    <ul className={styles['evolutions-container']}>
      {pokemonEvolutions.map(evo => {
        if (Array.isArray(evo)) {
          return (
            <li>
              <div className={styles.line}>
                <hr />
              </div>
              <div className={styles['alternate-evolutions-container']}>
                {evo.map(alternateEvo => (
                  <PokemonEvolution
                    key={alternateEvo.id}
                    evolution={alternateEvo}
                  />
                ))}
              </div>
            </li>
          );
        }

        return (
          <li key={evo.id}>
            <div className={styles.line}>
              <hr />
            </div>
            <div className={styles['alternate-evolutions-container']}>
              <PokemonEvolution evolution={evo} />
              {/* <PokemonEvolution evolution={evo} /> */}
              {/* <PokemonEvoluwtion evolution={evo} /> */}
              {/* <PokemonEvolution evolution={evo} /> */}
            </div>

            {/* {i !== pokemonEvolutions.length - 1 && <span>{'>'}</span>} */}
          </li>
        );
      })}
    </ul>
  );
};

export default PokemonDetailsEvolutions;
