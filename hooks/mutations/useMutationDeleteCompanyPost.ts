import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteCompanion } from '~/apis/accompany';

const useMutationDeleteCompanyPost = (accompanyPostId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ accompanyPostId }: { accompanyPostId: string }) =>
      deleteCompanion(accompanyPostId),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['companionPost', accompanyPostId],
      });
    },
  });
};

export default useMutationDeleteCompanyPost;
