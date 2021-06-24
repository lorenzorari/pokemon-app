import React from 'react';
import styles from './type-tag.module.scss';

const TypeTag = ({ value }) => {
  const el: HTMLElement = document.querySelector('.' + styles.type);

  const setCSSProperty = (property: string, value: string) => {
    el?.style.setProperty(property, value);
  };

  if (value !== 'fire') setCSSProperty('background-color', 'gray');
  else setCSSProperty('background-color', 'var(--color-fire)');

  return <div className={styles.type}>{value}</div>;
};

export default TypeTag;
