import React from 'react';
import styles from './stat.module.scss';

interface Props {
  title: string;
  value: number;
}

const Stat = ({ title, value }: Props) => {
  return (
    <div className={styles.stat}>
      <div className={styles.value}>{value}</div>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};

export default Stat;
