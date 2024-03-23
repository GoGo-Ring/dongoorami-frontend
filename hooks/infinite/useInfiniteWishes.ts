import { useInfiniteQuery } from '@tanstack/react-query';

import { getWishes } from '~/apis/wish';

const SIZE = 5;

export const WISHES_QUERY_KEY = 'wishes';
const useInfiniteWishes = () => {
  return useInfiniteQuery({
    queryKey: [WISHES_QUERY_KEY],
    queryFn: ({ pageParam }) => getWishes(pageParam, SIZE),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      return lastPage.hasNext
        ? lastPage.wishGetResponses.at(-1)?.wishId
        : undefined;
    },
    select: data => {
      return data?.pages.flatMap(page => page.wishGetResponses) ?? [];
    },
  });
};

export default useInfiniteWishes;
