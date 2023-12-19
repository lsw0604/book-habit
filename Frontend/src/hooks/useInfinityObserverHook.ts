import { MutableRefObject, useEffect } from 'react';

interface IProps {
  observerRef: MutableRefObject<HTMLDivElement | null>;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetching: boolean;
}

const OBSERVER_OPTION = {
  root: null,
  rootMargin: '20px',
  threshold: 1.0,
};

export default function useInfinityObserverHook({
  fetchNextPage,
  hasNextPage,
  isFetching,
  observerRef,
}: IProps) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
      observer.disconnect();
    }
  }, OBSERVER_OPTION);

  useEffect(() => {
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerRef, fetchNextPage, hasNextPage, isFetching]);
}
