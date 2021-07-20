import React from 'react';
import { ReactSVG } from 'react-svg';
import styles from './type-tag.module.scss';

interface Props {
  value: string;
  style?: React.CSSProperties;
}

const TypeTag = ({ value, style }: Props) => {
  const src = `./assets/${value}.svg`;

  const tagStyle = {
    ...style,
    '--color-type-1': `var(--color-${value}-1)`,
  };

  return <ReactSVG style={tagStyle} className={styles.type} src={src} />;
};

export default TypeTag;
