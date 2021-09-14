import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';
import styles from './search-bar.module.scss';

interface Props {
  type?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<any>;
  onKeyPress?: KeyboardEventHandler<any>;
}

const SearchBar = (props: Props) => {
  return (
    <div className={styles['search-bar']}>
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onKeyPress={props.onKeyPress}
      />

      <figure>
        <img src="/assets/svg/search.svg" />
      </figure>
    </div>
  );
};

export default SearchBar;
