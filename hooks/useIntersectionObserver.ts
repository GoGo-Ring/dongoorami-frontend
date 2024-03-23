import { useEffect, useRef } from 'react';

interface useIntersectionObseverProps {
  callback: () => void;
  condition: boolean;
  options?: IntersectionObserverInit;
}

const defaultOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};

const useIntersectionObsever = <T extends HTMLElement>({
  callback,
  condition,
  options = defaultOptions,
}: useIntersectionObseverProps) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const { current } = ref;

    if (!current) {
      return;
    }

    const intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && condition) {
          callback();
        }
      }),
        options;
    });

    intersectionObserver.observe(current);

    return () => {
      if (current) {
        intersectionObserver.unobserve(current);
      }
    };
  }, [callback, condition, options]);

  return ref;
};

export default useIntersectionObsever;
