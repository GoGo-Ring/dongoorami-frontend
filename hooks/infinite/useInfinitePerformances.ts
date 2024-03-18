import { useInfiniteQuery } from '@tanstack/react-query';

import { getPerformancesList } from '~/apis/performance';
import { PerformanceList } from '~/apis/scheme/performance';

const SIZE = 6;

export const useInfinitePerformances = (params: string) => {
  return useInfiniteQuery({
    queryKey: ['performances', params],
    queryFn: async ({ pageParam }): Promise<PerformanceList> => {
      return getPerformancesList(params, SIZE, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      return lastPage.hasNext ? allPage.length + 1 : undefined;
    },
  });
};
