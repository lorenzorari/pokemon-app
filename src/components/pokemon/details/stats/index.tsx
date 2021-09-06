import React from 'react';
import { Pokemon } from '../../../../models/pokemon';
import Stat from '../../../stat';
import styles from './stats.module.scss';

interface Props {
  pokemon: Pokemon;
}

const replaceDashBySpace = (word: string) => {
  return word.replace('-', ' ');
};

const PokemonDetailsStats = ({ pokemon }: Props) => {
  const stats = pokemon.stats.map(({ stat, baseStat }) => {
    const statName = replaceDashBySpace(stat.name);
    return { title: statName, value: baseStat };
  });

  return (
    <section className={styles['stats-container']}>
      {stats.map((stat, i) => (
        <Stat
          key={i}
          title={stat.title === 'hp' ? 'HP' : stat.title}
          value={stat.value}
        />
      ))}
    </section>
  );
};

export default PokemonDetailsStats;
