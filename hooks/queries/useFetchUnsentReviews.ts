import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getUnsentReviews } from '~/apis/review';

const SIZE = 10;
const useUnsentReviews = (size = SIZE) => {
  const query = useSuspenseInfiniteQuery({
    queryKey: ['unsent-reivews'],
    queryFn: ({ pageParam }) => getUnsentReviews({ cursorId: pageParam, size }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined;
    },
    select: data => data?.pages.flatMap(page => page.reviewResponses) ?? [],
  });

  return query;
};

export default useUnsentReviews;
