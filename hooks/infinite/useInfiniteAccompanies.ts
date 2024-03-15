import { useInfiniteQuery } from '@tanstack/react-query';

import { getCompanions } from '~/apis/companion';
import { AccompanyPostInfoList } from '~/apis/scheme/accompany';

const useInfiniteAccompanies = (params: string) => {
  return useInfiniteQuery({
    queryKey: ['accompanies', params],
    queryFn: async ({ pageParam }): Promise<AccompanyPostInfoList> => {
      return getCompanions(params, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      return lastPage.hasNext ? allPage.length + 1 : undefined;
    },
  });
};

export default useInfiniteAccompanies;
