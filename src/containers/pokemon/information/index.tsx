import React from 'react';
import styles from './information.module.scss';

interface Props {
  title: string;
  children: React.ReactNode;
}

const PokemonInformation = ({ title, children }: Props) => {
  return (
    <li className={styles.info}>
      <span className={styles['info-title']}>{title}</span>
      <span className={styles['info-content']}>{children}</span>
    </li>
  );
};

export default PokemonInformation;
