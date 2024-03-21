import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchCloseAccompanyStatus } from '~/apis/accompany';

const useMutationCloseCompanyStatus = (accompanyPostId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => patchCloseAccompanyStatus(accompanyPostId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companions'] });
      queryClient.invalidateQueries({
        queryKey: ['companionPost', accompanyPostId],
      });
    },
  });
};

export default useMutationCloseCompanyStatus;
