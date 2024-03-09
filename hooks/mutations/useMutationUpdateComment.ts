import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateComment } from '~/apis/accompany';

interface CommentData {
  content: string;
}

const useMutationUpdateComment = (
  accompanyPostId: string,
  commentId: string,
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ content }: CommentData) =>
      updateComment(accompanyPostId, commentId, content),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  return mutation;
};

export default useMutationUpdateComment;
