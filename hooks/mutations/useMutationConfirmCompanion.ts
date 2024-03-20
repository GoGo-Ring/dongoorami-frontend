import { useMutation, useQueryClient } from '@tanstack/react-query';

import { confirmCompanion } from '~/apis/accompany';

const useMutationConfirmCompanion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => confirmCompanion(commentId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

export default useMutationConfirmCompanion;
