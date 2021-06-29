import React, { useEffect, useRef } from 'react';
import PokemonCardId from './id';
import PokemonCardImage from './image';
import PokemonCardTitle from './title';
import TypeTag from '../../type-tag';
import styles from './card.module.scss';
import { setCSSProperty } from '../../../libs/utils/set-css-property';

const PokemonCard = ({ pokemon }) => {
  const cardRef = useRef<HTMLHeadingElement>(null);

  const setBackgroundColor = (type: string) => {
    setCSSProperty(
      cardRef.current,
      'background-color',
      `var(--color-${type}-2)`
    );
  };

  const setTheme = (type: string) => {
    setBackgroundColor(type);
  };

  useEffect(() => setTheme(pokemon?.types[0].type.name));

  return (
    <div ref={cardRef} className={styles.card}>
      <PokemonCardTitle pokemon={pokemon} />

      <PokemonCardId pokemon={pokemon} />

      <figure className={styles.figure}>
        <PokemonCardImage pokemon={pokemon} />
      </figure>

      <TypeTag value={pokemon?.types[0].type.name} />
    </div>
  );
};

export default PokemonCard;
