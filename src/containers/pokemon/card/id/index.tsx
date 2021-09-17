import React from 'react';
import { zeroPad } from 'src/helpers/utils/zero-pad';
import styles from './id.module.scss';

const PokemonCardId = ({ pokemon }) => {
  return <div className={styles.id}>{`#${zeroPad(pokemon?.id, 3)}`}</div>;
};

export default PokemonCardId;
