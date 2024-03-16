import { useMutation } from '@tanstack/react-query';

import { deleteCompanion } from '~/apis/accompany';

const useMutationDeleteCompanyPost = () => {
  return useMutation({
    mutationFn: ({ accompanyPostId }: { accompanyPostId: string }) =>
      deleteCompanion(accompanyPostId),
  });
};

export default useMutationDeleteCompanyPost;
