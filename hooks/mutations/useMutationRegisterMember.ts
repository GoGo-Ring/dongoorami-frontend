import { useMutation } from '@tanstack/react-query';

import { registerMember } from '~/apis/member';
import { RegisterMemberRequest } from '~/apis/scheme/member';

const useMutationRegisterMember = () => {
  return useMutation({
    mutationFn: (params: RegisterMemberRequest) => registerMember(params),
  });
};

export default useMutationRegisterMember;
