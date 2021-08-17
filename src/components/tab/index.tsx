import React from 'react';
import styles from './tab.module.scss';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
}

const Tab = ({ children, onClick, isActive }: Props) => {
  const className = [styles.tab, isActive && styles.active].join(' ');

  return (
    <li className={className} onClick={onClick}>
      {children}
    </li>
  );
};

export default Tab;
