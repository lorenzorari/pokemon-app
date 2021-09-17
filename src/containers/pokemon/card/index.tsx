import React, { memo } from 'react';
import classNames from 'classnames';
import TypeTag from 'src/components/type-tag';
import PokemonBackgroundImage from 'src/containers/pokemon/card/background-image';
import PokemonCardId from 'src/containers/pokemon/card/id';
import PokemonCardImage from 'src/containers/pokemon/card/image';
import PokemonCardTitle from 'src/containers/pokemon/card/title';
import { Pokemon } from 'src/models/pokemon';
import styles from './card.module.scss';

interface Props {
  pokemon: Pokemon;
  className?: string;
  onClick?: () => void;
}

const PokemonCard = ({ pokemon, className, onClick }: Props) => {
  const pokemonTypes = pokemon.types;
  const pokemonType = pokemonTypes[0].type.name;

  const style = {
    '--color-type-1': `var(--color-${pokemonType}-1)`,
    '--color-type-2': `var(--color-${pokemonType}-2)`,
  } as React.CSSProperties;

  return (
    <article
      className={classNames(styles.card, className)}
      style={style}
      onClick={onClick}
    >
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

      <PokemonBackgroundImage
        className={styles['background-image']}
        src={`/assets/svg/pokemon-types/${pokemonType}.svg`}
      />
    </article>
  );
};

const PokemonCardPropsAreEqual = (prev, next) => {
  return prev.pokemon === next.pokemon;
};

export default memo(PokemonCard, PokemonCardPropsAreEqual);
