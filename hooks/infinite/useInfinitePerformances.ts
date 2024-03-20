import { useInfiniteQuery } from '@tanstack/react-query';

import { getPerformancesList } from '~/apis/performance';

const SIZE = 6;

export const useInfinitePerformances = (params: string) => {
  return useInfiniteQuery({
    queryKey: ['performances', params],
    queryFn: ({ pageParam }) => getPerformancesList(params, SIZE, pageParam),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      const { concertGetShortResponses } = lastPage;
      const { length } = concertGetShortResponses;

      const lastId = length
        ? concertGetShortResponses[length - 1].id
        : undefined;

      return lastPage.hasNext ? lastId : undefined;
    },
  });
};
