import { useMutation } from '@tanstack/react-query';

import { updateCompanion } from '~/apis/accompany';

const useMutationUpdateCompanyPost = () => {
  return useMutation({
    mutationFn: ({
      accompanyPostId,
      formData,
    }: {
      accompanyPostId: string;
      formData: FormData;
    }) => updateCompanion(accompanyPostId, formData),
  });
};

export default useMutationUpdateCompanyPost;
