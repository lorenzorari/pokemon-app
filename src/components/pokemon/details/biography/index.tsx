import React from 'react';
import PokemonDescription from '../../description';
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

      <PokemonDescription>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur
        doloremque dolore vero, ipsa quidem, cupiditate corrupti numquam,
        doloribus quisquam magni animi eius dicta nostrum repudiandae esse
        placeat aspernatur? Maxime, quia.
      </PokemonDescription>

      <ul className={styles['info-container']}>
        <PokemonInformation title="Species">content</PokemonInformation>
        <PokemonInformation title="Height">content</PokemonInformation>
        <PokemonInformation title="Weight">content</PokemonInformation>
        <PokemonInformation title="Abilities">content</PokemonInformation>
        <PokemonInformation title="Gender">content</PokemonInformation>
      </ul>
    </div>
  );
};

export default PokemonDetailsBiography;
