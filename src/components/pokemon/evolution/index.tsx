import React from 'react';
import { getArtworkUrl } from '../../../helpers/get-artwork-url';
import styles from './evolution.module.scss';

const PokemonEvolution = ({ evolution }) => {
  return (
    <article className={styles.evolution}>
      <figure>
        <img src={getArtworkUrl(evolution.id)} alt={evolution.name} />
      </figure>

      <h3>{evolution.name}</h3>
    </article>
  );
};

export default PokemonEvolution;
