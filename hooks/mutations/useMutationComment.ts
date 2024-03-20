'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createComment } from '~/apis/accompany';

interface CommentData {
  content: string;
}

const useMutationComment = (accompanyPostId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ content }: CommentData) =>
      createComment(accompanyPostId, content),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  return mutation;
};

export default useMutationComment;
