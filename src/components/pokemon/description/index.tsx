import React from 'react';
import styles from './description.module.scss';

interface Props {
  children: React.ReactNode;
}

const PokemonDescription = ({ children }: Props) => {
  return <p className={styles.description}>{children}</p>;
};

export default PokemonDescription;
