import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAcompanyApplyComment } from '~/apis/accompany';

const useMutationCreateCompanyComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createAcompanyApplyComment(postId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });
};

export default useMutationCreateCompanyComment;
