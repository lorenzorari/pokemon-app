import React from 'react';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import styles from './scroll-icon.module.scss';

interface Props {
  src: string;
  className?: string;
}

const ScrollIcon = ({ src, className }: Props) => {
  return (
    <ReactSVG
      className={classNames(styles['scroll-icon'], className)}
      src={src}
    />
  );
};

export default ScrollIcon;
