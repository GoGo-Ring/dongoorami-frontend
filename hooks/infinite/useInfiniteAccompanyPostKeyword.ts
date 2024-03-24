import { useInfiniteQuery } from '@tanstack/react-query';

import { getCompanionsAccompanyList } from '~/apis/companion';

const SIZE = 6;

interface accompaniesParam {
  keyword?: string;
  size?: number;
}

export const useInfiniteAccompanyPostKeyword = ({
  keyword = '',
  size = SIZE,
}: accompaniesParam) => {
  return useInfiniteQuery({
    queryKey: ['performancesKeyword', keyword],
    queryFn: ({ pageParam }) =>
      getCompanionsAccompanyList({
        size,
        lastId: pageParam,
        keyword,
      }),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      const { accompanyPostInfos } = lastPage;
      const { length } = accompanyPostInfos;

      const lastId = length ? accompanyPostInfos[length - 1].id : undefined;

      return lastPage.hasNext ? lastId : undefined;
    },
  });
};
