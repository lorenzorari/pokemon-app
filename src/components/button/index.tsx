import React from 'react';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import styles from './button.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
  theme?: 'default' | 'back';
  onClick?: () => void;
}

const Button = ({ children, className, theme = 'default', onClick }: Props) => {
  return (
    <>
      {theme === 'default' ? (
        <button className={classNames(styles.btn, className)} onClick={onClick}>
          {children}
        </button>
      ) : (
        <button
          className={classNames(styles['btn-back'], className)}
          onClick={onClick}
        >
          <ReactSVG src="/assets/svg/arrow.svg" />
          <span>{children}</span>
        </button>
      )}
    </>
  );
};

export default Button;
