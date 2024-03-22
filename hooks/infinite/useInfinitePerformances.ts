import { useInfiniteQuery } from '@tanstack/react-query';

import { getPerformancesList } from '~/apis/performance';

const SIZE = 6;

interface accompaniesParam {
  searchParams: string;
  keyword?: string;
  size?: number;
}
export const useInfinitePerformances = ({
  searchParams,
  keyword,
  size = SIZE,
}: accompaniesParam) => {
  return useInfiniteQuery({
    queryKey: ['performances', searchParams, keyword],
    queryFn: ({ pageParam }) =>
      getPerformancesList({
        searchParams,
        size,
        lastId: pageParam,
        keyword,
      }),
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
