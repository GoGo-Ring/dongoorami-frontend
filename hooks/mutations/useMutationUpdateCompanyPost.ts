import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateCompanion } from '~/apis/accompany';

const useMutationUpdateCompanyPost = (accompanyPostId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      accompanyPostId,
      formData,
    }: {
      accompanyPostId: string;
      formData: FormData;
    }) => updateCompanion(accompanyPostId, formData),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['companions'] });
      queryClient.invalidateQueries({
        queryKey: ['companionPost', accompanyPostId],
      });
    },
  });
};

export default useMutationUpdateCompanyPost;
