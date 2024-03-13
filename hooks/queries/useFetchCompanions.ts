import { useQuery } from '@tanstack/react-query';

import getCompanions from '~/apis/companion';

const useFetchCompanions = () => {
  return useQuery({
    queryKey: ['companions'],
    queryFn: getCompanions,
  });
};

export default useFetchCompanions;
