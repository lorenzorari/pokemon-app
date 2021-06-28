import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';

interface Props {
  type?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<any>;
  onKeyPress?: KeyboardEventHandler<any>;
}

const TextField = (props: Props) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      onKeyPress={props.onKeyPress}
    />
  );
};

export default TextField;
