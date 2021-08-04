import React from 'react';
import styles from './stat.module.scss';

interface Props {
  title: string;
  value: number;
}

const Stat = ({ title, value }: Props) => {
  const colorStat =
    (value < 50 && 'var(--color-stat-bad)') ||
    (value < 70 && 'var(--color-stat-medium)') ||
    (value < 100 && 'var(--color-stat-good)') ||
    'var(--color-stat-great)';

  const styleValue = {
    borderColor: colorStat,
  } as React.CSSProperties;

  return (
    <div className={styles.stat}>
      <div style={styleValue} className={styles.value}>
        {value}
      </div>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};

export default Stat;
