import { useEffect, useRef } from 'react';

interface useIntersectionObseverProps {
  handleFetchNextPage: () => void;
  hasNextPage: boolean;
}

const useIntersectionObsever = ({
  handleFetchNextPage,
  hasNextPage,
}: useIntersectionObseverProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = ref;

    const intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && hasNextPage) {
          handleFetchNextPage();
        }
      }),
        { threshold: 0 };
    });

    if (current) {
      intersectionObserver.observe(current);
    }

    return () => {
      if (current) {
        intersectionObserver.unobserve(current);
      }
    };
  }, [handleFetchNextPage, hasNextPage]);

  return [ref];
};

export default useIntersectionObsever;
