import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getWrittenPosts } from '~/apis/member';

const SIZE = 3;
const useFetchWrittenPosts = () => {
  const query = useSuspenseInfiniteQuery({
    queryKey: ['writtenPosts'],
    queryFn: ({ pageParam }) => getWrittenPosts(SIZE, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined;
    },
    select: data =>
      data?.pages.flatMap(page => page.accompanyPostShortResponses) ?? [],
  });

  return query;
};

export default useFetchWrittenPosts;
