import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateProfileImage } from '~/apis/member';
import { Member } from '~/apis/scheme/member';

const useMutationProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: FormData) => updateProfileImage(file),
    onSuccess: data => {
      queryClient.setQueryData(['member'], (oldData: Member) => ({
        ...oldData,
        profileImage: data,
      }));
    },
  });
};

export default useMutationProfileImage;
