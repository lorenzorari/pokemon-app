import React from 'react';
import PokemonCardId from './id';
import PokemonCardImage from './image';
import PokemonCardTitle from './title';
import TypeTag from '../../type-tag';
import { Pokemon } from '../../../../models/pokemon';
import styles from './card.module.scss';

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
  const pokemonType = pokemon.types[0].type.name;

  const style = {
    '--color-type-1': `var(--color-${pokemonType}-1)`,
    '--color-type-2': `var(--color-${pokemonType}-2)`,
  } as React.CSSProperties;

  return (
    <div style={style} className={styles.card}>
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
