import { useMutation } from '@tanstack/react-query';

import { createCompanion } from '~/apis/accompany';

const useMutationCreateCompanyPost = () => {
  return useMutation({
    mutationFn: (formData: FormData) => createCompanion(formData),
  });
};

export default useMutationCreateCompanyPost;
