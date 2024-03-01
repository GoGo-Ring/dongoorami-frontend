'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createComment } from '~/apis/accompany';

const useMutationComment = (accompanyPostId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    onMutate: async ({
      userId,
      content,
    }: {
      userId: string;
      content: string;
    }) => {
      createComment(accompanyPostId, userId, content);
      const perviousComments = queryClient.getQueryData(['comments']);

      queryClient.setQueryData(['comments'], (oldData: string[]) => [
        ...oldData,
        content,
      ]);

      return { perviousComments };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(['comments'], context?.perviousComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  return mutation;
};

export default useMutationComment;
