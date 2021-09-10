import React from 'react';
import { getArtworkUrl } from '../../../helpers/get-artwork-url';
import styles from './evolution.module.scss';

interface Props {
  evolution: any;
  onClick?: () => void;
}

const PokemonEvolution = ({ evolution, onClick }: Props) => {
  const cursorStyle = onClick ? { cursor: 'pointer' } : { cursor: 'default' };

  return (
    <article style={cursorStyle} className={styles.evolution} onClick={onClick}>
      <figure>
        <img src={getArtworkUrl(evolution.id)} alt={evolution.name} />
      </figure>

      <h3>{evolution.name}</h3>
    </article>
  );
};

export default PokemonEvolution;
