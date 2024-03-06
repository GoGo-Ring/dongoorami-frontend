import { useQuery } from '@tanstack/react-query';

import { getMember } from '~/apis/member';

const useFetchMember = () => {
  const { error, ...rest } = useQuery({
    queryKey: ['member'],
    queryFn: () => getMember(),
  });

  if (error) {
    throw error;
  }

  return { ...rest };
};

export default useFetchMember;
