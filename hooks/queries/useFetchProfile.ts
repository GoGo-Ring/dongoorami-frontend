import { useQuery } from '@tanstack/react-query';

import { getProfile } from '~/apis/member';

const useFetchProfile = (id: number) => {
  const { error, ...rest } = useQuery({
    queryKey: ['profile', id],
    queryFn: () => getProfile(id),
  });

  if (error) {
    throw error;
  }

  return rest;
};

export default useFetchProfile;
