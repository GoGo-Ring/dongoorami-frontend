import { useInfiniteQuery } from '@tanstack/react-query';

import getPerformances from '~/apis/performance';
import { PerformanceList } from '~/apis/scheme/performance';

export const useInfinitePerformances = (params: string) => {
  return useInfiniteQuery({
    queryKey: ['performances', params],
    queryFn: async ({ pageParam }): Promise<PerformanceList> => {
      return getPerformances(params, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      return lastPage.hasNext ? allPage.length + 1 : undefined;
    },
  });
};
