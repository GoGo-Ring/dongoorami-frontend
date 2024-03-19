import { useEffect, useRef } from 'react';

interface useIntersectionObseverProps {
  handleFetchNextPage: () => void;
  hasNextPage: boolean;
  threshold?: number;
}

const useIntersectionObsever = ({
  handleFetchNextPage,
  hasNextPage,
  threshold = 0,
}: useIntersectionObseverProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = ref;

    if (!current) {
      return;
    }

    const intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && hasNextPage) {
          handleFetchNextPage();
        }
      }),
        { threshold };
    });

    if (current) {
      intersectionObserver.observe(current);
    }

    return () => {
      if (current) {
        intersectionObserver.unobserve(current);
      }
    };
  }, [handleFetchNextPage, hasNextPage, threshold]);

  return [ref];
};

export default useIntersectionObsever;
