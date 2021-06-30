import React, { useEffect, useRef } from 'react';
import { setCSSProperty } from '../../../../libs/utils/set-css-property';
import styles from './title.module.scss';

const PokemonCardTitle = ({ pokemon }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // const setBackgroundColor = (type: string) => {
  //   setCSSProperty(
  //     titleRef.current,
  //     'background-color',
  //     `var(--color-${type}-1)`
  //   );
  // };

  // const setTheme = (type: string) => {
  //   setBackgroundColor(type);
  // };

  // useEffect(() => setTheme(pokemon?.types[0].type.name));

  return (
    <h2 ref={titleRef} className={styles.title}>
      {pokemon?.name}
    </h2>
  );
};

export default PokemonCardTitle;
