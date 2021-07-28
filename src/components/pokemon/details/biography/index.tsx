import React from 'react';
import PokemonInformation from '../../information';
import styles from './biography.module.scss';

const PokemonDetailsBiography = () => {
  return (
    <div className={styles['details-container']}>
      <ul className={styles['details-tabs']}>
        <li>Biography</li>
        <li>Stats</li>
        <li>Evolutions</li>
      </ul>

      <p className={styles.description}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero
        necessitatibus, accusantium aliquid dolorem dolor odit sit sunt?
        Adipisci, nesciunt! Cupiditate minus delectus, facilis voluptates
        obcaecati alias accusantium. Fugiat, qui enim.
      </p>

      <ul className={styles['info-container']}>
        <PokemonInformation title="Species" content="content" />
        <PokemonInformation title="Height" content="content" />
        <PokemonInformation title="Weight" content="content" />
        <PokemonInformation title="Abilities" content="content" />
        <PokemonInformation title="Gender" content="content" />
      </ul>
    </div>
  );
};

export default PokemonDetailsBiography;
