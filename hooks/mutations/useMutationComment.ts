'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createComment } from '~/apis/accompany';
import { Comment } from '~/apis/scheme/comment';

interface CommentData {
  content: string;
}

const useMutationComment = (accompanyPostId: string, userId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ content }: CommentData) =>
      createComment(accompanyPostId, userId, content),
    onMutate: async ({ content }: CommentData) => {
      const perviousComments = queryClient.getQueryData<Comment[]>([
        'comments',
      ]);

      if (!perviousComments) {
        return;
      }

      queryClient.setQueryData(['comments'], () => [
        ...perviousComments,
        {
          memberId: userId,
          content,
        },
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
