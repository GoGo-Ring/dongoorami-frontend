import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createCompanion } from '~/apis/accompany';

const useMutationCreateCompanyPost = (accompanyPostId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createCompanion(formData),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['companionPost', accompanyPostId],
      });
    },
  });
};

export default useMutationCreateCompanyPost;
