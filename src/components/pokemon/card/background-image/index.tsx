import React from 'react';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import styles from './background-image.module.scss';

interface Props {
  src: string;
  className?: string;
}

const PokemonBackgroundImage = ({ src, className }: Props) => {
  return (
    <ReactSVG
      className={classNames(styles['background-image'], className)}
      src={src}
    />
  );
};

export default PokemonBackgroundImage;
