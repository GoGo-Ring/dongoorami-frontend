import { useQuery } from '@tanstack/react-query';

import { getPerformances } from '~/apis/performance';

const useFetchPerformances = () => {
  const { error, ...rest } = useQuery({
    queryKey: ['performances'],
    queryFn: getPerformances,
  });

  if (error) {
    throw error;
  }

  return { ...rest };
};

export default useFetchPerformances;
