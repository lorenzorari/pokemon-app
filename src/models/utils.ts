export type BaseComponent<T = object> = T & {
  className?: string;
};

export type BaseComponentWithChildren<T = object> = BaseComponent<T> & {
  children?: React.ReactNode;
};
