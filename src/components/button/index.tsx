import React from 'react';
import { ReactSVG } from 'react-svg';
import styles from './button.module.scss';

interface Props {
  children: React.ReactNode;
  theme?: 'default' | 'back';
  onClick?: () => void;
}

const Button = ({ children, theme = 'default', onClick }: Props) => {
  return (
    <>
      {theme === 'default' ? (
        <button onClick={onClick}>{children}</button>
      ) : (
        <button className={styles['btn-back']} onClick={onClick}>
          <ReactSVG src="/assets/arrow.svg" />
          <span>{children}</span>
        </button>
      )}
    </>
  );
};

export default Button;
