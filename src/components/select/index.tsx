import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import styles from './select.module.scss';
import { useClickOutside } from 'src/helpers/hooks/click-outside';

interface Props {
  children: React.ReactNode;
  defaultValue: string;
  className?: string;
  tabIndex?: number;
}

const Select = ({ children, defaultValue, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useClickOutside(selectRef, () => setIsOpen(false));

  return (
    <div className={classNames(styles.select, className)}>
      <div
        ref={selectRef}
        className={styles['select-trigger']}
        tabIndex={0}
        onClick={handleClick}
      >
        {defaultValue}
        <ReactSVG
          className={styles.arrow}
          src="assets/svg/arrow.svg"
          wrapper="span"
        />
      </div>

      {isOpen === true && <ul className={styles.options}>{children}</ul>}
    </div>
  );
};

export default Select;
