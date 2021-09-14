import React, {
  ChangeEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MutableRefObject,
} from 'react';
import classNames from 'classnames';
import styles from './search-bar.module.scss';

interface Props {
  className?: string;
  type?: string;
  placeholder?: string;

  onChange?: ChangeEventHandler<any>;
  onKeyPress?: KeyboardEventHandler<any>;
}

const SearchBar = forwardRef((props: Props, ref?: MutableRefObject<any>) => {
  return (
    <div
      ref={ref}
      className={classNames(styles['search-bar'], props.className)}
    >
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
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
