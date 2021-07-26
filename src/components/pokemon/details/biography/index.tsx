import React from 'react';
import styles from './biography.module.scss';

const PokemonDetailsBiography = () => {
  return (
    <div className={styles['details-container']}>
      <ul className={styles['details-tabs']}>
        <li>Biography</li>
        <li>Stats</li>
        <li>Evolutions</li>
      </ul>

      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero
        necessitatibus, accusantium aliquid dolorem dolor odit sit sunt?
        Adipisci, nesciunt! Cupiditate minus delectus, facilis voluptates
        obcaecati alias accusantium. Fugiat, qui enim.
      </p>
    </div>
  );
};

export default PokemonDetailsBiography;
