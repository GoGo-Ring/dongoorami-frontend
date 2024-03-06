import { useQuery } from '@tanstack/react-query';

import getCompanion from '~/apis/companion';
import getPerformances from '~/apis/performance';

export const usePerformances = () => {
  return useQuery({
    queryKey: ['performances'],
    queryFn: getPerformances,
  });
};

export const useCompanion = () => {
  return useQuery({
    queryKey: ['companions'],
    queryFn: getCompanion,
  });
};
