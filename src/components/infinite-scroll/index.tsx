import React, { forwardRef, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  observerCallback: IntersectionObserverCallback;
  page: number;
  loaderElement: JSX.Element;
  loadMore: () => void;
}

const InfiniteScroll = forwardRef(
  ({ children, observerCallback, loaderElement }: Props, ref: any) => {
    const Loader = () => loaderElement;

    useEffect(() => {
      const observer = new IntersectionObserver(observerCallback);
      if (ref?.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [ref, observerCallback]);

    return (
      <>
        {children}
        <Loader />
      </>
    );
  },
);

InfiniteScroll.displayName = 'InfiniteScroll';

export default InfiniteScroll;
