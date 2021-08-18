import React from 'react';
import PokemonCardId from './id';
import PokemonCardImage from './image';
import PokemonCardTitle from './title';
import TypeTag from '../../type-tag';
import { Pokemon } from '../../../../models/pokemon';
import styles from './card.module.scss';
import { ReactSVG } from 'react-svg';

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
  const pokemonTypes = pokemon.types;
  const pokemonType = pokemonTypes[0].type.name;

  const style = {
    '--color-type-1': `var(--color-${pokemonType}-1)`,
    '--color-type-2': `var(--color-${pokemonType}-2)`,
  } as React.CSSProperties;

  return (
    <div style={style} className={styles.card}>
      <PokemonCardTitle pokemon={pokemon} />

      <PokemonCardId pokemon={pokemon} />

      <div className={styles['types-container']}>
        {pokemonTypes.map(({ type }, i) => (
          <TypeTag key={i} className={styles['type-tag']} value={type.name} />
        ))}
      </div>

      <figure className={styles.figure}>
        <PokemonCardImage pokemon={pokemon} />
      </figure>

      <ReactSVG
        className={styles['background-image']}
        src={`./assets/${pokemonType}.svg`}
      />
    </div>
  );
};

export default PokemonCard;
