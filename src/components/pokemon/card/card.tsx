import React from 'react';
import { getArtworkUrl } from '../../../helpers/get-artwork-url';
import { zeroPad } from '../../../libs/utils/zero-pad';
import styles from './card.module.scss';
import PokemonCardTitle from './title';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className={styles.card}>
      <PokemonCardTitle pokemon={pokemon} />

      <div className={styles.card__number}>{`#${zeroPad(pokemon?.id, 3)}`}</div>

      <figure className={styles.card__figure}>
        <img
          className={styles.card__figure__image}
          src={pokemon && getArtworkUrl(pokemon)}
          alt={pokemon?.name}
        />
      </figure>

      <div className={styles.card__typeContainer}>
        <div className={styles.card__type}>{pokemon?.types[0].type.name}</div>
      </div>
    </div>
  );
};

export default PokemonCard;
