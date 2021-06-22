import React from 'react';
import styles from './type-tag.module.scss';

const TypeTag = ({ value }) => {
  return <div className={styles.type}>{value}</div>;
};

export default TypeTag;
