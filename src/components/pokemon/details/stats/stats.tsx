import React from 'react';
import Stat from '../../../stat';
import styles from './stats.module.scss';

const PokemonDetailsStats = () => {
  return (
    <section className={styles['stats-container']}>
      <Stat title="HP" value="70" />
      <Stat title="Attack" value="70" />
      <Stat title="Defense" value="70" />
      <Stat title="Special Attack" value="70" />
      <Stat title="Special Defense" value="70" />
      <Stat title="Speed" value="70" />
    </section>
  );
};

export default PokemonDetailsStats;
