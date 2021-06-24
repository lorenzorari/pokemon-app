import React from 'react';
import PokemonCardId from './id';
import PokemonCardImage from './image';
import PokemonCardTitle from './title';
import TypeTag from '../../type-tag';
import styles from './card.module.scss';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className={styles.card}>
      <PokemonCardTitle pokemon={pokemon} />

      <PokemonCardId pokemon={pokemon} />

      <figure className={styles.figure}>
        <PokemonCardImage pokemon={pokemon} />
      </figure>

      <div className={styles['type-container']}>
        <TypeTag value={pokemon?.types[0].type.name} />
      </div>
    </div>
  );
};

export default PokemonCard;
