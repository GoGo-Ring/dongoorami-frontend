import { useQuery } from '@tanstack/react-query';

import getPerformances from '../apis/performance';

export const usePerformances = () => {
  return useQuery({
    queryKey: ['performances'],
    queryFn: getPerformances,
  });
};
