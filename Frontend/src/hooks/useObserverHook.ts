import { RefObject, useState, useEffect } from 'react';

export default function useObserverHook<T extends HTMLElement>(
  ref: RefObject<T>
): { isVisible: boolean } {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, observerOptions);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return { isVisible };
}
