import React from 'react';
import styles from './title.module.scss';

const PokemonCardTitle = ({ pokemon }) => {
  return <h2 className={styles.title}>{pokemon?.name}</h2>;
};

export default PokemonCardTitle;
