import { useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLElement = any>(
  handler: () => void,
) => {
  const ref = useRef<T>(null);

  const handleClick = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      handler();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handler]);

  return ref;
};
