import React from 'react';
import classNames from 'classnames';
import styles from './option.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
  value?: string;
  onClick?: () => void;
}

const Option = ({ children, className, onClick }: Props) => {
  return (
    <li className={classNames(styles.option, className)} onClick={onClick}>
      {children}
    </li>
  );
};

export default Option;
