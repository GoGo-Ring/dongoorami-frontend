import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { deleteCompanion } from '~/apis/accompany';

const useMutationDeleteCompanyPost = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ accompanyPostId }: { accompanyPostId: string }) =>
      deleteCompanion(accompanyPostId),
    onSettled: () => {
      router.push('/search');
    },
  });
};

export default useMutationDeleteCompanyPost;
