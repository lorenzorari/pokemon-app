import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';
import styles from './text-field.module.scss';

interface Props {
  type?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<any>;
  onKeyPress?: KeyboardEventHandler<any>;
}

const TextField = (props: Props) => {
  return (
    <div className={styles['search-bar']}>
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onKeyPress={props.onKeyPress}
      />
      <figure>
        <img src="./assets/search.svg" />
      </figure>
    </div>
  );
};

export default TextField;
