import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getReviews } from '~/apis/review';

const SIZE = 3;

export const REVIEWS_QUERY_KEY = 'reviews';
const useFetchReviews = (id?: number, size = SIZE) => {
  return useSuspenseInfiniteQuery({
    queryKey: [REVIEWS_QUERY_KEY],
    queryFn: ({ pageParam }) => getReviews({ id, cursorId: pageParam, size }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined;
    },
    select: data => data?.pages.flatMap(page => page.reviewResponses) ?? [],
  });
};

export default useFetchReviews;
