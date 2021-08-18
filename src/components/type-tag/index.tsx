import React from 'react';
import { ReactSVG } from 'react-svg';
import styles from './type-tag.module.scss';

interface Props {
  value: string;
  className?: string;
}

const TypeTag = ({ value, className }: Props) => {
  const src = `/assets/${value}.svg`;

  const tagStyle = {
    '--color-type-1': `var(--color-${value}-1)`,
  } as React.CSSProperties;

  return (
    <ReactSVG
      style={tagStyle}
      className={[styles.type, className].join(' ')}
      src={src}
    />
  );
};

export default TypeTag;
