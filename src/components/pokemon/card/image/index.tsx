import React from 'react';
import { getArtworkUrl } from '../../../../helpers/get-artwork-url';
import styles from './image.module.scss';

const PokemonCardImage = ({ pokemon }) => {
  return (
    <img
      className={styles.image}
      src={pokemon && getArtworkUrl(pokemon)}
      alt={pokemon?.name}
    />
  );
};

export default PokemonCardImage;
