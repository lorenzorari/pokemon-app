import React from 'react';
import styles from './tab.module.scss';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
}

const Tab = ({ children, onClick, isActive }: Props) => {
  return (
    <li className={isActive && styles.active} onClick={onClick}>
      {children}
    </li>
  );
};

export default Tab;
