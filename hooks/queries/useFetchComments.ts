'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { getComments } from '~/apis/accompany';

const useFetchComments = (accompanyPostId: string) => {
  const query = useSuspenseQuery({
    queryKey: ['comments', accompanyPostId],
    queryFn: () => getComments(accompanyPostId),
    select: data => data.accompanyCommentInfos,
  });

  return query;
};

export default useFetchComments;
