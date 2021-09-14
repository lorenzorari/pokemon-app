import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';
import classNames from 'classnames';
import styles from './search-bar.module.scss';

interface Props {
  className?: string;
  type?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<any>;
  onKeyPress?: KeyboardEventHandler<any>;
}

const SearchBar = (props: Props) => {
  return (
    <div className={classNames(styles['search-bar'], props.className)}>
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
