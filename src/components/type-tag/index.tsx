import React from 'react';
import { ReactSVG } from 'react-svg';
import styles from './type-tag.module.scss';

interface Props {
  value: string;
  style?: React.CSSProperties;
}

const TypeTag = ({ value, style }: Props) => {
  const src = `./assets/${value}.svg`;

  return <ReactSVG style={style} className={styles.type} src={src} />;
};

export default TypeTag;
