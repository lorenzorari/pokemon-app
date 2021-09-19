import classNames from 'classnames';
import React from 'react';
import styles from './modal.module.scss';

interface Props {
  children: React.ReactNode;
  isOpen?: boolean;
  className?: string;
}

const Modal = ({ children, isOpen = false, className }: Props) => {
  return (
    <div
      style={{ display: isOpen ? 'flex' : 'none' }}
      className={classNames(styles.modal, className)}
    >
      {children}
    </div>
  );
};

export default Modal;
