import { useQuery } from '@tanstack/react-query';

import { getCarouselPerformances } from '~/apis/performance';

export const useFetchCarouselPerformances = () => {
  const { error, ...rest } = useQuery({
    queryKey: ['carousel-performances'],
    queryFn: getCarouselPerformances,
  });

  if (error) {
    throw error;
  }

  return { ...rest };
};
