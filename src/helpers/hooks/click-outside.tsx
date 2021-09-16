import React, { MutableRefObject } from 'react';

interface ClickOutsideCallback {
  (): void;
}

const useClickOutside = (
  ref: MutableRefObject<any>,
  callback: ClickOutsideCallback
) => {
  const handleClick = e => {
    console.log(e.target, ref.current);

    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  React.useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useClickOutside;
