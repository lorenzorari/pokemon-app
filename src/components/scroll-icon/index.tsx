import React, { memo } from 'react';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import styles from './scroll-icon.module.scss';

interface Props {
  src: string;
  className?: string;
  onClick?: () => void;
}

const ScrollIcon = ({ src, className, onClick }: Props) => {
  const style = {
    cursor: 'pointer',
  } as React.CSSProperties;

  return (
    <ReactSVG
      style={onClick ? style : {}}
      className={classNames(styles['scroll-icon'], className)}
      onClick={onClick}
      src={src}
    />
  );
};

export default memo(ScrollIcon, (prev, next) => prev.src === next.src);
