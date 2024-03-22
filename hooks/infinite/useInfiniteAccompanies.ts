import { useInfiniteQuery } from '@tanstack/react-query';

import { getCompanionsList } from '~/apis/companion';

const SIZE = 6;

interface accompaniesParam {
  searchParams: string;
  size?: number;
  keyword?: string;
}

const useInfiniteAccompanies = ({
  searchParams,
  size = SIZE,
  keyword = '',
}: accompaniesParam) => {
  return useInfiniteQuery({
    queryKey: ['accompanies', searchParams],
    queryFn: ({ pageParam }) =>
      getCompanionsList({ searchParams, keyword, size, lastId: pageParam }),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      const { accompanyPostInfos } = lastPage;
      const { length } = accompanyPostInfos;

      const lastId = length ? accompanyPostInfos[length - 1].id : undefined;

      return lastPage.hasNext ? lastId : undefined;
    },
  });
};

export default useInfiniteAccompanies;
