import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteComment } from '~/apis/accompany';

interface CommentData {
  commentId: string;
}

const useMutationDeleteComment = (accompanyPostId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ commentId }: CommentData) =>
      deleteComment(accompanyPostId, commentId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  return mutation;
};

export default useMutationDeleteComment;
