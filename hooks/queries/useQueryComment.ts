'use client';

import { useQuery } from '@tanstack/react-query';

import { getComments } from '~/apis/accompany';

const useQueryComment = (accompanyPostId: string) => {
  const query = useQuery({
    queryKey: ['comments', accompanyPostId],
    queryFn: async () => (await getComments(accompanyPostId)).data,
  });

  return query;
};

export default useQueryComment;
