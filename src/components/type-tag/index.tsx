import React, { useEffect, useRef } from 'react';
import { setCSSProperty } from '../../libs/utils/set-css-property';
import styles from './type-tag.module.scss';

const TypeTag = ({ value }) => {
  const typeRef = useRef<HTMLDivElement>(null);

  const setBackgroundColor = (type: string) => {
    setCSSProperty(
      typeRef.current,
      'background-color',
      `var(--color-${type}-1`
    );
  };

  const setTheme = type => {
    setBackgroundColor(type);
  };

  useEffect(() => setTheme(value));

  return (
    <div ref={typeRef} className={styles.type}>
      {value}
    </div>
  );
};

export default TypeTag;
