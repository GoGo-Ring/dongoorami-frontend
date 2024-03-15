import { useInfiniteQuery } from '@tanstack/react-query';

import { getPerformancesList } from '~/apis/performance';
import { PerformanceList } from '~/apis/scheme/performance';

export const useInfinitePerformances = (params: string) => {
  return useInfiniteQuery({
    queryKey: ['performances', params],
    queryFn: async ({ pageParam }): Promise<PerformanceList> => {
      return getPerformancesList(params, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      return lastPage.hasNext ? allPage.length + 1 : undefined;
    },
  });
};
