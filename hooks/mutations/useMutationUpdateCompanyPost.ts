import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { updateCompanion } from '~/apis/accompany';

const useMutationUpdateCompanyPost = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      accompanyPostId,
      formData,
    }: {
      accompanyPostId: string;
      formData: FormData;
    }) => updateCompanion(accompanyPostId, formData),
    onSettled: () => {
      router.push('/search');
    },
  });
};

export default useMutationUpdateCompanyPost;
