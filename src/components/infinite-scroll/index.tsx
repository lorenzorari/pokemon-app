import React, { forwardRef, FunctionComponent, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  observerCallback: IntersectionObserverCallback;
  page: number;
  loaderElement: JSX.Element;
  loadMore: () => Promise<void>;
}

const InfiniteScroll = forwardRef(
  (
    { children, observerCallback, page, loadMore, loaderElement }: Props,
    ref: React.MutableRefObject<any>
  ) => {
    const Loader = () => loaderElement;

    useEffect(() => {
      const observer = new IntersectionObserver(observerCallback);

      if (ref?.current) observer.observe(ref.current);

      return () => observer.disconnect();
    }, [ref, observerCallback]);

    useEffect(() => {
      if (page > 1) loadMore();
    }, [page]);

    return (
      <>
        {children}
        <Loader />
      </>
    );
  }
);

InfiniteScroll.displayName = 'InfiniteScroll';

export default InfiniteScroll;
