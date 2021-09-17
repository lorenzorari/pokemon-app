import React, { MutableRefObject } from 'react';

interface ClickOutsideCallback {
  (): void;
}

interface HookClickOutside {
  (ref: MutableRefObject<any>, callback: ClickOutsideCallback): void;
}

export const useClickOutside: HookClickOutside = (ref, callback) => {
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
