import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { createCompanion } from '~/apis/accompany';

const useMutationCreateCompanyPost = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (formData: FormData) => createCompanion(formData),
    onSettled: () => {
      router.push('/search');
    },
  });
};

export default useMutationCreateCompanyPost;
