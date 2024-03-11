import { useMutation } from '@tanstack/react-query';

import { updateMember } from '~/apis/member';

const useMutationUpdateMember = () => {
  return useMutation({
    mutationFn: (...args: Parameters<typeof updateMember>) =>
      updateMember(...args),
  });
};

export default useMutationUpdateMember;
