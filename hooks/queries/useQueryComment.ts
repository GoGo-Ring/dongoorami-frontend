'use client';

import { useQuery } from '@tanstack/react-query';

import { getComments } from '~/apis/accompany';

const useQueryComment = (accompanyPostId: string) => {
  const query = useQuery({
    queryKey: ['comments', accompanyPostId],
    queryFn: () => getComments(accompanyPostId),
  });

  return query;
};

export default useQueryComment;
