import { useInfiniteQuery } from '@tanstack/react-query';

import { getCompanionsList } from '~/apis/companion';

const SIZE = 6;
const useInfiniteAccompanies = (params: string, size?: number) => {
  return useInfiniteQuery({
    queryKey: ['accompanies', params],
    queryFn: ({ pageParam }) =>
      getCompanionsList(params, size !== undefined ? size : SIZE, pageParam),
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
