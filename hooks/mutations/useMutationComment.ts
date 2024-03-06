'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createComment } from '~/apis/accompany';
import { Comment } from '~/apis/scheme/comment';

interface CommentData {
  userId: string;
  content: string;
}

const useMutationComment = (accompanyPostId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ userId, content }: CommentData) =>
      createComment(accompanyPostId, userId, content),
    onMutate: async ({ userId, content }: CommentData) => {
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
