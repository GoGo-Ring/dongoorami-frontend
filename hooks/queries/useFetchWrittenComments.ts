import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getWrittenComments } from '~/apis/member';

const SIZE = 3;
const useFetchWrittenComments = () => {
  const query = useSuspenseInfiniteQuery({
    queryKey: ['writtenComments'],
    queryFn: ({ pageParam }) => getWrittenComments(SIZE, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined;
    },
    select: data =>
      data?.pages.flatMap(page => page.accompanyCommentShortResponses) ?? [],
  });

  return query;
};

export default useFetchWrittenComments;
