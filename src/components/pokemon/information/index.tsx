import React from 'react';
import styles from './information.module.scss';

interface Props {
  title: string;
  content: string;
}

const PokemonInformation = ({ title, content }: Props) => {
  return (
    <li className={styles.info}>
      <span className={styles['info-title']}>{title}</span>
      <span className={styles['info-content']}>{content}</span>
    </li>
  );
};

export default PokemonInformation;
